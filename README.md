# PDF Combiner

A modern, cross-platform desktop application for combining multiple PDF files into a single document. Built with React, Electron, and Vite for a fast, beautiful user experience.

## Features

- 🔄 **Drag & Drop Interface** - Easily add and reorder PDF files
- 📄 **Merge Multiple PDFs** - Combine unlimited PDF files into one document
- 🎨 **Beautiful UI** - Modern, intuitive design with smooth animations
- 🖥️ **Cross-Platform** - Works on macOS and Windows
- 🔒 **Privacy First** - All processing happens locally, no cloud uploads
- ⚡ **Auto-Updates** - Automatically receive the latest features and fixes

## Installation

### For End Users

Download the latest installer for your platform:

- **macOS**: Download `PDF Combiner-X.X.X.dmg` from the [Releases](https://github.com/alvarsolutions/pdf-combiner-app/releases) page
- **Windows**: Download `PDF Combiner-X.X.X.exe` from the [Releases](https://github.com/alvarsolutions/pdf-combiner-app/releases) page

### macOS Installation
1. Download the `.dmg` file
2. Open the downloaded file
3. Drag the app to your Applications folder
4. Launch from Applications

### Windows Installation
1. Download the `.exe` installer
2. Run the installer
3. Follow the installation wizard
4. Launch from the Start Menu

## Development Setup

### Prerequisites

- Node.js 20 or higher
- npm

### Getting Started

1. Clone the repository:
```bash
git clone https://github.com/alvarsolutions/pdf-combiner-app.git
cd pdf-combiner-app
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server (web version):
```bash
npm run dev
```

4. Run the Electron app in development mode:
```bash
npm run electron:dev
```

### Available Scripts

- `npm run dev` - Start Vite development server (web mode)
- `npm run build` - Build the web application
- `npm run electron:dev` - Run the Electron app in development mode
- `npm run electron:build` - Build the desktop installers
- `npm run lint` - Run ESLint
- `npm run preview` - Preview the production build

## Building Desktop Installers

### Build for your current platform:
```bash
npm run electron:build
```

This will create installers in the `release/` directory:
- **macOS**: Creates a `.dmg` file
- **Windows**: Creates a `.exe` installer

### Build Requirements

- **macOS builds** require macOS
- **Windows builds** require Windows or a CI/CD pipeline

## Releasing a New Version

The project uses GitHub Actions for automated builds and releases.

### Release Process

1. Update the version in `package.json`:
```bash
npm version patch  # or minor, or major
```

2. Push the tag to GitHub:
```bash
git push --tags
```

3. The GitHub Actions workflow will automatically:
   - Build installers for macOS and Windows
   - Create a new GitHub Release
   - Upload the installers
   - Enable auto-updates for existing users

### Code Signing (Recommended for Production)

For production releases, you should configure code signing:

**macOS:**
- Obtain an Apple Developer certificate
- Configure notarization
- Add signing credentials to GitHub Secrets

**Windows:**
- Obtain a code signing certificate
- Add certificate credentials to GitHub Secrets

Without code signing, users will see security warnings during installation.

## Auto-Updates

The application automatically checks for updates when launched. Users will be notified when a new version is available and can download it with one click.

Updates are delivered via GitHub Releases, so ensure each release includes the built installers and `.blockmap` files.

## Technology Stack

- **React 19** - UI framework
- **Vite 7** - Build tool and dev server
- **Electron 33** - Desktop application framework
- **pdf-lib** - PDF manipulation
- **electron-updater** - Auto-update functionality

## Project Structure

```
pdf-combiner-app/
├── .github/workflows/    # GitHub Actions workflows
├── build/               # Build resources (icons, etc.)
├── dist/                # Built web application
├── electron/            # Electron main process code
├── public/              # Static assets
├── release/             # Built installers (generated)
├── src/                 # React application source
│   ├── components/      # React components
│   ├── utils/           # Utility functions
│   ├── App.jsx          # Main app component
│   └── main.jsx         # React entry point
├── index.html           # HTML template
├── package.json         # Project configuration
└── vite.config.js       # Vite configuration
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is MIT licensed.

## Support

For issues and questions, please open an issue on the [GitHub repository](https://github.com/alvarsolutions/pdf-combiner-app/issues).
