// Genera backlog.csv, planes de sprint y Gantt (Mermaid) desde tools/plan.json.
// Uso: node tools/generar-plan.mjs   (la fuente de verdad del plan es plan.json)
import fs from 'node:fs';

const raiz = new URL('../', import.meta.url).pathname;
const plan = JSON.parse(fs.readFileSync(`${raiz}tools/plan.json`, 'utf8'));
const REPO_URL = `https://github.com/${plan.repo}`;
const enlace = (n) => `[#${n}](${REPO_URL}/issues/${n})`;
const horasDe = (h) => h.tareas.reduce((s, t) => s + t.horas, 0);
const fmt = (iso) => iso.split('-').reverse().slice(0, 2).join('/'); // 2026-11-09 -> 09/11
const estadoDe = (n) => plan.sprints.find((s) => s.n === n).estado ?? 'Por hacer';
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
  lineas.push([h.id, h.tipo, '', h.historia, '', h.prioridad, h.puntos, horasDe(h), h.sprint, estadoDe(h.sprint), h.criterios.join(' | '), `${REPO_URL}/issues/${h.issue}`].map(csv).join(','));
  for (const t of h.tareas)
    lineas.push([`${h.id}-${t.id}`, 'Tarea', h.id, t.titulo, t.area, '', '', t.horas, h.sprint, estadoDe(h.sprint), '', `${REPO_URL}/issues/${t.issue}`].map(csv).join(','));
}
escribir('docs/backlog.csv', '﻿' + lineas.join('\n') + '\n');

// ---- Planes de sprint
for (const s of sprints) {
  const md = [
    `# Sprint ${s.n} — ${s.nombre}`,
    '',
    `**Fechas:** ${fmt(s.dias[0])} al ${fmt(s.dias.at(-1))} de noviembre de 2026 (${s.dias.length} días hábiles).`,
    `**Meta:** ${s.meta}`,
    `**Integrante responsable:** [@${s.integrante}](https://github.com/${s.integrante})`,
    `**Compromiso:** ${s.puntos} puntos · ${s.horas} h de ${s.capacidad} h de capacidad (${plan.horasPorDia} h/día).`,
    '',
    `> Estado: **${s.estado ?? 'Por hacer'}**. ${s.estado === 'Hecho' ? 'El sprint se cerró con sus pruebas en verde (ver `contexto/ESTADO.md`).' : 'El código de este sprint se agrega en su rama `sprint-' + s.n + '`.'}`,
    '',
    '| Historia | Issue | Puntos | Horas | Inicio | Fin |',
    '|---|---|---:|---:|---|---|',
    ...s.filas.map((f) => `| ${f.h.id} ${f.h.titulo} | ${enlace(f.h.issue)} | ${f.h.puntos} | ${f.horas} | ${fmt(f.inicio)} | ${fmt(f.fin)} |`),
    '',
  ];
  // Texto del PR de cierre: cada keyword cierra su issue al fusionar
  md.push('## Texto para el pull request', '', `Título: \`Sprint ${s.n}: ${s.nombre}\``, '', '```text', `Entrega del Sprint ${s.n} (${s.puntos} pts, ${s.horas} h). Ver docs/sprints/sprint-${s.n}.md.`, '');
  for (const { h } of s.filas) md.push(`Closes #${h.issue}`, ...h.tareas.map((t) => `Closes #${t.issue}`));
  md.push('```', '');
  for (const { h, horas } of s.filas) {
    md.push(`## ${h.id} — ${h.titulo} (${h.puntos} pts, ${horas} h) · ${enlace(h.issue)}`, '', `*${h.historia}*`, '', '**Criterios de aceptación**', '');
    h.criterios.forEach((c) => md.push(`- ${c}`));
    md.push('', '| Tarea | Issue | Área | Horas | Estado |', '|---|---|---|---:|---|');
    h.tareas.forEach((t) => md.push(`| ${h.id}-${t.id} ${t.titulo} | ${enlace(t.issue)} | ${t.area} | ${t.horas} | ${s.estado ?? 'Por hacer'} |`));
    md.push('');
  }
  escribir(`docs/sprints/sprint-${s.n}.md`, md.join('\n'));
}

// ---- Resumen de sprints (tabla para README del plan)
const resumen = [
  '| Sprint | Fechas | Meta | Historias | Puntos | Horas | Integrante |',
  '|---|---|---|---|---:|---:|---|',
  ...sprints.map((s) => `| [${s.n} — ${s.nombre}](sprints/sprint-${s.n}.md) | ${fmt(s.dias[0])}–${fmt(s.dias.at(-1))} | ${s.meta} | ${s.filas.map((f) => f.h.id).join(', ')} | ${s.puntos} | ${s.horas} | @${s.integrante} |`),
  `| **Total** | | | ${plan.historias.length} | ${sprints.reduce((a, s) => a + s.puntos, 0)} | ${sprints.reduce((a, s) => a + s.horas, 0)} | |`,
].join('\n');
escribir('docs/sprints/resumen.md', resumen + '\n');

// ---- Gantt Mermaid
const g = [
  'gantt',
  `    title ${plan.proyecto}: 3 sprints de 3 días hábiles (nov 2026)`,
  '    dateFormat YYYY-MM-DD',
  '    axisFormat %d/%m',
  `    excludes weekends, ${plan.feriados.join(', ')}`,
  '    todayMarker off',
];
for (const s of sprints) {
  g.push(`    section Sprint ${s.n} ${s.nombre}`);
  for (const f of s.filas) g.push(`    ${f.h.id} ${f.h.corto ?? f.h.titulo} (${f.h.puntos} pts) :${f.h.id.toLowerCase()}, ${f.inicio}, ${f.dias}d`);
  g.push(`    Revisión y retrospectiva S${s.n} :milestone, ${s.dias.at(-1)}, 0d`);
}
const mermaid = g.join('\n');
escribir('docs/gantt.mmd', mermaid + '\n');
escribir('docs/gantt.md', [
  '# Diagrama de Gantt', '',
  'Calendario de los 3 sprints (3 días hábiles cada uno, 7 h productivas por día). El 16 de noviembre es feriado y se excluye.',
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
  '| Avance | Los issues se cierran al fusionar el PR del sprint; el progreso de sub-issues se ve en su barra |',
  '| Ramas y PR | Una rama `sprint-N` por integrante (ver [guia-equipo.md](guia-equipo.md)); el PR cierra los issues con `Closes #N` |', '',
  '## Configurar el GitHub Project (tablero)', '',
  `El Project ya existe: ${plan.project}. Las herramientas automáticas no pueden editar Projects v2, así que se configura desde la web:`, '',
  '1. En el repositorio: **Projects → Link a project** (o crea uno nuevo, plantilla *Board*) y nómbralo «Incidencias FES».',
  '2. En el proyecto: **Add item → Add items from repository** y agrega los 57 issues (o activa el flujo *Auto-add* con el filtro `is:issue repo:' + plan.repo + '`).',
  '3. Campos recomendados: **Sprint** (tipo *Iteration*; inicios el ' + sprints.map((s) => fmt(s.dias[0])).join(', ') + ' de nov, 3 días hábiles cada uno), **Estimate** (número, horas) y **Points** (número).',
  '4. Vistas: *Tablero* agrupado por **Status** (Todo, In progress, Done), *Tabla* agrupada por **Sprint** y *Roadmap* por el campo Sprint.',
  '5. Workflows del proyecto: activar «Item closed → Status = Done» para que cerrar un issue mueva la tarjeta.', '',
  '### Milestones', '',
  `Ya existen y tienen asignados sus issues: ${sprints.map((s) => `[Sprint ${s.n}](${REPO_URL}/milestone/${s.n}) (vence ${fmt(s.dias.at(-1))}/2026)`).join(', ')}. Todo issue nuevo debe llevar el milestone de su sprint.`, '',
  '### Cierre automático de sprints', '',
  'Cada sprint llega por un pull request cuyo texto lleva `Closes #N` por historia y tarea: al fusionarlo, GitHub cierra esos issues y el workflow del Project «Item closed → Done» mueve las tarjetas. [`cerrar-sprint.yml`](../.github/workflows/cerrar-sprint.yml) queda como respaldo manual (pestaña *Actions*) para cerrar lo que haya quedado abierto de un milestone.', '',
  '## Issues', '',
  '| Issue | Título | Tipo | Sprint | Esfuerzo |', '|---|---|---|---:|---|',
  ...filasIssues, '',
].join('\n'));

console.log(`Plan generado: ${plan.historias.length} historias, ${sprints.map((s) => `S${s.n}=${s.puntos}pts/${s.horas}h`).join(' ')}`);
