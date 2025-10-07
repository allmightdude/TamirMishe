# TamirMishe - مرکز تخصصی تعمیرات ماشین لباسشویی

## 🚀 Vite Migration Complete!

This project has been migrated from manual build process to **Vite** for better development experience and performance.

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🛠️ Development

### Start Development Server
```bash
npm run dev
```
- Opens at `http://localhost:3000`
- Hot reload enabled
- SCSS compilation
- Asset optimization

### Build for Production
```bash
npm run build
```
- Creates optimized `dist/` folder
- Minified CSS and JS
- Optimized images
- Tree-shaking enabled

## 📁 Project Structure

```
app/
├── assets/
│   ├── styles/          # SCSS files
│   ├── scripts/         # JavaScript files
│   └── css/            # Compiled CSS (auto-generated)
├── static/             # Static assets
│   ├── fonts/          # Font files
│   ├── images/         # Images
│   ├── icons/          # Icon files
│   └── video/          # Video files
├── components/         # Reusable components
├── *.html             # HTML pages
├── main.js            # Vite entry point
├── vite.config.js     # Vite configuration
└── package.json       # Dependencies
```

## 🎯 Features

- ⚡ **Fast Development**: Vite's lightning-fast HMR
- 🎨 **SCSS Support**: Automatic compilation
- 📱 **Multiple Pages**: All HTML files supported
- 🖼️ **Asset Optimization**: Images, fonts, icons
- 🔧 **Modern Tooling**: ES modules, TypeScript ready
- 📦 **Production Ready**: Optimized builds

## 🔄 Migration Changes

### Before (Manual):
- Manual SCSS compilation
- Static asset copying
- No build optimization

### After (Vite):
- Automatic SCSS compilation
- Asset optimization
- Hot module replacement
- Tree-shaking
- Code splitting

## 🚀 Benefits

1. **10-100x faster** build times
2. **Instant hot reload** during development
3. **Automatic asset optimization**
4. **Modern ES modules** support
5. **Better development experience**

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run serve` - Serve production build on port 3000

## 🎉 Enjoy your new development experience!
