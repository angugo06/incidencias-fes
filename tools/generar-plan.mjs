// Genera backlog.csv, planes de sprint y Gantt (Mermaid) desde tools/plan.json.
// Uso: node tools/generar-plan.mjs   (la fuente de verdad del plan es plan.json)
import fs from 'node:fs';

const raiz = new URL('../', import.meta.url).pathname;
const plan = JSON.parse(fs.readFileSync(`${raiz}tools/plan.json`, 'utf8'));
const horasDe = (h) => h.tareas.reduce((s, t) => s + t.horas, 0);
const fmt = (iso) => iso.split('-').reverse().slice(0, 2).join('/'); // 2026-11-09 -> 09/11
const escribir = (ruta, txt) => fs.writeFileSync(`${raiz}${ruta}`, txt);

// ---- Validación: 1 punto = 2 h y los datos cuadran
for (const h of plan.historias) {
  if (horasDe(h) !== h.puntos * 2) throw new Error(`${h.id}: horas (${horasDe(h)}) != puntos*2`);
}

// ---- Calendario: historias en secuencia dentro del sprint, 7 h por día hábil
const sprints = plan.sprints.map((s) => {
  const historias = plan.historias.filter((h) => h.sprint === s.n);
  let acum = 0;
  const filas = historias.map((h) => {
    const hs = horasDe(h);
    const ini = Math.floor(acum / plan.horasPorDia);
    const fin = Math.ceil((acum + hs) / plan.horasPorDia) - 1;
    acum += hs;
    return { h, horas: hs, inicio: s.dias[ini], fin: s.dias[Math.min(fin, s.dias.length - 1)], dias: fin - ini + 1 };
  });
  return {
    ...s, filas,
    horas: acum,
    puntos: historias.reduce((a, h) => a + h.puntos, 0),
    capacidad: s.dias.length * plan.horasPorDia,
  };
});

// ---- backlog.csv (mismas columnas que el backlog anterior)
const csv = (v) => `"${String(v ?? '').replaceAll('"', '""')}"`;
const lineas = ['ID,Tipo,Historia,Título,Área,Prioridad,Puntos,Horas,Sprint,Estado,Criterios de aceptación'];
for (const h of plan.historias) {
  lineas.push([h.id, h.tipo, '', h.historia, '', h.prioridad, h.puntos, horasDe(h), h.sprint, 'Hecho', h.criterios.join(' | ')].map(csv).join(','));
  for (const t of h.tareas)
    lineas.push([`${h.id}-${t.id}`, 'Tarea', h.id, t.titulo, t.area, '', '', t.horas, h.sprint, 'Hecho', ''].map(csv).join(','));
}
escribir('docs/backlog.csv', '﻿' + lineas.join('\n') + '\n');

// ---- Planes de sprint
for (const s of sprints) {
  const md = [
    `# Sprint ${s.n} — ${s.nombre}`,
    '',
    `**Fechas:** ${fmt(s.dias[0])} al ${fmt(s.dias.at(-1))} de noviembre de 2026 (5 días hábiles).`,
    `**Meta:** ${s.meta}`,
    `**Compromiso:** ${s.puntos} puntos · ${s.horas} h de ${s.capacidad} h de capacidad (${plan.horasPorDia} h/día).`,
    '',
    '> Estado: código de este sprint implementado y verificado. Las fechas son el calendario planeado del sprint.',
    '',
    '| Historia | Puntos | Horas | Inicio | Fin |',
    '|---|---:|---:|---|---|',
    ...s.filas.map((f) => `| ${f.h.id} ${f.h.titulo} | ${f.h.puntos} | ${f.horas} | ${fmt(f.inicio)} | ${fmt(f.fin)} |`),
    '',
  ];
  for (const { h, horas } of s.filas) {
    md.push(`## ${h.id} — ${h.titulo} (${h.puntos} pts, ${horas} h)`, '', `*${h.historia}*`, '', '**Criterios de aceptación**', '');
    h.criterios.forEach((c) => md.push(`- ${c}`));
    md.push('', '| Tarea | Área | Horas | Estado |', '|---|---|---:|---|');
    h.tareas.forEach((t) => md.push(`| ${h.id}-${t.id} ${t.titulo} | ${t.area} | ${t.horas} | Hecho |`));
    md.push('');
  }
  escribir(`docs/sprints/sprint-${s.n}.md`, md.join('\n'));
}

// ---- Resumen de sprints (tabla para README del plan)
const resumen = [
  '| Sprint | Fechas | Meta | Historias | Puntos | Horas |',
  '|---|---|---|---|---:|---:|',
  ...sprints.map((s) => `| [${s.n} — ${s.nombre}](sprints/sprint-${s.n}.md) | ${fmt(s.dias[0])}–${fmt(s.dias.at(-1))} | ${s.meta} | ${s.filas.map((f) => f.h.id).join(', ')} | ${s.puntos} | ${s.horas} |`),
  `| **Total** | | | ${plan.historias.length} | ${sprints.reduce((a, s) => a + s.puntos, 0)} | ${sprints.reduce((a, s) => a + s.horas, 0)} |`,
].join('\n');
escribir('docs/sprints/resumen.md', resumen + '\n');

// ---- Gantt Mermaid
const g = [
  'gantt',
  `    title ${plan.proyecto}: 3 sprints de 1 semana (nov 2026)`,
  '    dateFormat YYYY-MM-DD',
  '    axisFormat %d/%m',
  `    excludes weekends, ${plan.feriados.join(', ')}`,
  '    todayMarker off',
];
for (const s of sprints) {
  g.push(`    section Sprint ${s.n} ${s.nombre}`);
  for (const f of s.filas) g.push(`    ${f.h.id} ${f.h.titulo} (${f.h.puntos} pts) :${f.h.id.toLowerCase()}, ${f.inicio}, ${f.dias}d`);
  g.push(`    Revisión y retrospectiva S${s.n} :milestone, ${s.dias.at(-1)}, 0d`);
}
const mermaid = g.join('\n');
escribir('docs/gantt.mmd', mermaid + '\n');
escribir('docs/gantt.md', [
  '# Diagrama de Gantt', '',
  'Calendario de los 3 sprints (lunes a viernes, 7 h productivas por día). El 16 de noviembre es feriado y se excluye.',
  'Las historias de cada sprint van en secuencia; una historia puede compartir día con la anterior. El archivo fuente es `gantt.mmd`.', '',
  '```mermaid', mermaid, '```', '',
  '![Gantt](gantt.png)', '',
  resumen, '',
].join('\n'));

console.log(`Plan generado: ${plan.historias.length} historias, ${sprints.map((s) => `S${s.n}=${s.puntos}pts/${s.horas}h`).join(' ')}`);
