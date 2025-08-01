# RunJS - JavaScript Code Runner

Una aplicación de escritorio tipo RunJS construida con Tauri 2.0, React y TypeScript, siguiendo principios de Clean Architecture.

## 🚀 Características

- **Editor de código avanzado**: Monaco Editor con soporte para temas oscuros
- **Ejecución segura**: Sandbox para ejecutar código JavaScript de forma segura
- **Layout dividido**: Paneles redimensionables con split layout
- **Auto-guardado**: Guardado automático del código con configuración personalizable
- **Atajos de teclado**: Ctrl+S para guardar, Ctrl+Enter para ejecutar
- **Arquitectura limpia**: Implementación siguiendo Clean Architecture y DDD

## 🏗️ Arquitectura

El proyecto sigue una arquitectura hexagonal (Ports & Adapters) con las siguientes capas:

```
src/
├── domain/           # Entidades y reglas de negocio
├── application/      # Casos de uso y puertos
├── infrastructure/   # Adaptadores y implementaciones
├── presentation/     # Componentes React y hooks
└── shared/          # Tipos, utilidades y constantes
```

### Capas principales:

1. **Domain**: Entidades y reglas de negocio centrales
2. **Application**: Casos de uso que orquestan la lógica de negocio
3. **Infrastructure**: Adaptadores que implementan los puertos
4. **Presentation**: Componentes React y hooks para la UI

## 🛠️ Tecnologías

- **Tauri 2.0**: Framework para aplicaciones de escritorio
- **React 18**: Framework de UI
- **TypeScript**: Tipado estático
- **Monaco Editor**: Editor de código (el mismo que usa VSCode)
- **Split.js**: Layout dividido redimensionable
- **Clean Architecture**: Patrón arquitectónico

## 📦 Instalación

### Prerrequisitos

- Node.js 18+
- Rust (para Tauri)
- pnpm (recomendado)

### Instalación

```bash
# Clonar el repositorio
git clone <repository-url>
cd runjs-app

# Instalar dependencias
pnpm install

# Ejecutar en modo desarrollo
pnpm tauri dev
```

## 🎯 Uso

### Funcionalidades principales

1. **Editor de código**: Escribe JavaScript en el panel izquierdo
2. **Ejecución**: Presiona "Run" o Ctrl+Enter para ejecutar
3. **Auto-guardado**: El código se guarda automáticamente cada 2 segundos
4. **Guardado manual**: Presiona "Save" o Ctrl+S para guardar manualmente
5. **Redimensionar**: Arrastra la línea divisoria para ajustar el tamaño de los paneles

### Atajos de teclado

- `Ctrl+S` / `Cmd+S`: Guardar código
- `Ctrl+Enter` / `Cmd+Enter`: Ejecutar código
- `Ctrl+Shift+P`: Abrir paleta de comandos (futuro)

## 🔧 Desarrollo

### Scripts disponibles

```bash
# Desarrollo
pnpm tauri dev

# Construcción
pnpm tauri build

# Linting
pnpm lint
pnpm lint:fix

# Formateo
pnpm format

# Verificación de tipos
pnpm type-check
```

### Estructura del proyecto

```
src/
├── domain/
│   ├── entities/     # Entidades del dominio
│   ├── repositories/ # Interfaces de repositorios
│   └── services/     # Servicios del dominio
├── application/
│   ├── use-cases/    # Casos de uso
│   └── ports/        # Puertos (interfaces)
├── infrastructure/
│   ├── adapters/     # Adaptadores que implementan puertos
│   └── persistence/  # Capa de persistencia
├── presentation/
│   ├── components/   # Componentes React
│   ├── hooks/        # Hooks personalizados
│   └── store/        # Estado global (futuro)
└── shared/
    ├── types/        # Tipos compartidos
    ├── utils/        # Utilidades
    └── constants/    # Constantes
```

## 🚧 Características futuras

- [ ] Modo Vim completo con monaco-vim
- [ ] Temas personalizables
- [ ] Historial de ejecuciones
- [ ] Exportación de código
- [ ] Autenticación y sincronización con backend
- [ ] Soporte para múltiples lenguajes
- [ ] Snippets y plantillas
- [ ] Configuración avanzada del editor

## 🔒 Seguridad

La aplicación implementa un sandbox seguro para la ejecución de código JavaScript:

- Validación de patrones peligrosos
- Ejecución en entorno aislado
- Captura segura de output
- Prevención de acceso a APIs del sistema

## 📝 Licencia

MIT License - ver [LICENSE](LICENSE) para más detalles.

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Changelog

### v0.1.0
- Implementación inicial con Clean Architecture
- Editor Monaco con tema oscuro
- Ejecución segura de JavaScript
- Layout dividido redimensionable
- Auto-guardado y persistencia local
