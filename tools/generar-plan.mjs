// Genera backlog.csv, planes de sprint y Gantt (Mermaid) desde tools/plan.json.
// Uso: node tools/generar-plan.mjs   (la fuente de verdad del plan es plan.json)
import fs from 'node:fs';

const raiz = new URL('../', import.meta.url).pathname;
const plan = JSON.parse(fs.readFileSync(`${raiz}tools/plan.json`, 'utf8'));
const REPO_URL = `https://github.com/${plan.repo}`;
const enlace = (n) => `[#${n}](${REPO_URL}/issues/${n})`;
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
const lineas = ['ID,Tipo,Historia,Título,Área,Prioridad,Puntos,Horas,Sprint,Estado,Criterios de aceptación,Issue'];
for (const h of plan.historias) {
  lineas.push([h.id, h.tipo, '', h.historia, '', h.prioridad, h.puntos, horasDe(h), h.sprint, 'Implementado', h.criterios.join(' | '), `${REPO_URL}/issues/${h.issue}`].map(csv).join(','));
  for (const t of h.tareas)
    lineas.push([`${h.id}-${t.id}`, 'Tarea', h.id, t.titulo, t.area, '', '', t.horas, h.sprint, 'Implementado', '', `${REPO_URL}/issues/${t.issue}`].map(csv).join(','));
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
    '| Historia | Issue | Puntos | Horas | Inicio | Fin |',
    '|---|---|---:|---:|---|---|',
    ...s.filas.map((f) => `| ${f.h.id} ${f.h.titulo} | ${enlace(f.h.issue)} | ${f.h.puntos} | ${f.horas} | ${fmt(f.inicio)} | ${fmt(f.fin)} |`),
    '',
  ];
  for (const { h, horas } of s.filas) {
    md.push(`## ${h.id} — ${h.titulo} (${h.puntos} pts, ${horas} h) · ${enlace(h.issue)}`, '', `*${h.historia}*`, '', '**Criterios de aceptación**', '');
    h.criterios.forEach((c) => md.push(`- ${c}`));
    md.push('', '| Tarea | Issue | Área | Horas | Estado |', '|---|---|---|---:|---|');
    h.tareas.forEach((t) => md.push(`| ${h.id}-${t.id} ${t.titulo} | ${enlace(t.issue)} | ${t.area} | ${t.horas} | Implementado |`));
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


// ---- docs/github.md: enlace entre plan, issues y GitHub Project
const filasIssues = plan.historias.flatMap((h) => [
  `| ${enlace(h.issue)} | **${h.id}** ${h.titulo} | Historia | ${h.sprint} | ${h.puntos} pts / ${horasDe(h)} h |`,
  ...h.tareas.map((t) => `| ${enlace(t.issue)} | ${h.id}-${t.id} ${t.titulo} | Tarea (sub-issue de ${enlace(h.issue)}) | ${h.sprint} | ${t.horas} h |`),
]);
escribir('docs/github.md', [
  '# GitHub: repositorio, issues y Project', '',
  `Repositorio: ${REPO_URL}`, '',
  `GitHub Project (tablero): ${plan.project}`, '',
  'El plan (`tools/plan.json`) es la fuente de verdad; cada historia y tarea tiene su issue. Este archivo se genera con `node tools/generar-plan.mjs`.', '',
  '## Estructura en GitHub', '',
  '| Elemento | Convención |',
  '|---|---|',
  '| Historia | Issue `HU-NN Título` / `HT-NN Título`, etiquetas `sprint-N`, `historia` o `tecnica`, `puntos-N` |',
  '| Tarea | Sub-issue de su historia `HU-NN-TN Título (N h)`, etiquetas `sprint-N`, `tarea` y el área (`backend`, `frontend`, `bd`, `pruebas`, `docs`, `devops`) |',
  '| Sprint | Etiqueta `sprint-1`, `sprint-2`, `sprint-3` y milestone `Sprint N` |',
  '| Avance | Se cierra el issue de la historia en la revisión del sprint; el progreso de sub-issues se ve en su barra |',
  '| Ramas y PR | `sprint-N/HU-NN-descripcion`; el PR cierra el issue con `Closes #N` |', '',
  '## Configurar el GitHub Project (tablero)', '',
  `El Project ya existe: ${plan.project}. Las herramientas automáticas no pueden editar Projects v2, así que se configura desde la web:`, '',
  '1. En el repositorio: **Projects → Link a project** (o crea uno nuevo, plantilla *Board*) y nómbralo «Incidencias FES».',
  '2. En el proyecto: **Add item → Add items from repository** y agrega los 57 issues (o activa el flujo *Auto-add* con el filtro `is:issue repo:' + plan.repo + '`).',
  '3. Campos recomendados: **Sprint** (tipo *Iteration*, 1 semana: 9, 17 y 24 de nov), **Estimate** (número, horas) y **Points** (número).',
  '4. Vistas: *Tablero* agrupado por **Status** (Todo, In progress, Done), *Tabla* agrupada por **Sprint** y *Roadmap* por el campo Sprint.',
  '5. Workflows del proyecto: activar «Item closed → Status = Done» para que cerrar un issue mueva la tarjeta.', '',
  '### Milestones', '',
  `Ya existen y tienen asignados sus issues: [Sprint 1](${REPO_URL}/milestone/1) (vence 13/11/2026), [Sprint 2](${REPO_URL}/milestone/2) (23/11/2026) y [Sprint 3](${REPO_URL}/milestone/3) (30/11/2026). Todo issue nuevo debe llevar el milestone de su sprint.`, '',
  '## Issues', '',
  '| Issue | Título | Tipo | Sprint | Esfuerzo |', '|---|---|---|---:|---|',
  ...filasIssues, '',
].join('\n'));

console.log(`Plan generado: ${plan.historias.length} historias, ${sprints.map((s) => `S${s.n}=${s.puntos}pts/${s.horas}h`).join(' ')}`);
