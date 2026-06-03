# Calendar Test

Aplicación de gestión de turnos de equipo con vista de roster y calendario mensual. Desarrollada con Next.js, TypeScript y React.

## Requisitos

- [Node.js](https://nodejs.org/) >= 18
- [Bun](https://bun.sh/) >= 1.0 (gestor de paquetes)

## Instalación

```bash
# Clonar el repositorio
git clone <url-del-repositorio>
cd calendar-test

# Instalar dependencias
bun install
```

## Configuración de entorno

Copia el archivo de ejemplo y ajústalo si es necesario:

```bash
cp .env.local.example .env.local
```

| Variable | Descripción | Valor por defecto |
|---|---|---|
| `NEXT_PUBLIC_ADMIN_PIN` | PIN de 4 dígitos para acceder al modo edición | `1632` |
| `NEXT_PUBLIC_BASE_PATH` | Base path si se despliega en un subdirectorio | `""` |

## Ejecución en desarrollo

```bash
bun run dev
```

Abrir [http://localhost:3000](http://localhost:3000) en el navegador.

## Build de producción

```bash
bun run build
```

Genera la carpeta `out/` con el sitio estático exportado.

Para servir el build localmente:

```bash
bun run start
```

## Scripts disponibles

| Comando | Descripción |
|---|---|
| `bun run dev` | Inicia servidor de desarrollo |
| `bun run build` | Compila y exporta el sitio estático |
| `bun run start` | Sirve el build de producción |
| `bun run lint` | Ejecuta el linter de Next.js |

## Estructura del proyecto

```
├── pages/          # Páginas de Next.js
├── src/
│   ├── components/ # Componentes React
│   ├── constants/  # Constantes y configuración
│   ├── hooks/      # Custom hooks
│   ├── services/   # Servicios (almacenamiento, GitHub)
│   ├── types/      # Tipos TypeScript
│   └── utils/      # Utilidades
├── data/           # Datos por defecto (team.json)
└── public/         # Archivos estáticos
```

## Características

- Vista de equipo con tarjetas de miembros
- Calendario mensual por integrante con turnos coloreados
- Modo administrador protegido con PIN
- Sobrescritura de turnos por día específico
- Persistencia local (localStorage)
- Persistencia opcional vía GitHub (directa o mediante Pull Request)
- Diseño responsive
- Interfaz en español
