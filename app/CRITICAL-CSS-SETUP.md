# 🚀 Critical CSS Setup - No More FOUC!

This project now has a **centralized critical CSS solution** that prevents FOUC (Flash of Unstyled Content) across all pages without duplicating code.

## 📁 **File Structure**

```
app/
├── assets/css/critical.css          # 🎯 Centralized critical CSS
├── components/
│   ├── head-template.html          # 📄 Reusable head template
│   └── page-template.html          # 📄 Full page template
├── scripts/
│   └── update-pages.js             # 🔧 Auto-update script
└── main.js                         # ⚡ Imports critical CSS first
```

## 🎯 **How It Works**

### **1. Critical CSS File**
- **Location**: `assets/css/critical.css`
- **Purpose**: Contains all essential styles for initial render
- **Usage**: Loaded first to prevent FOUC

### **2. Automatic Page Updates**
- **Script**: `npm run update-pages`
- **Function**: Adds critical CSS link to all HTML pages
- **Result**: No manual copying needed!

### **3. Loading Strategy**
```css
.vite-loading {
    opacity: 0 !important;
    visibility: hidden !important;
}

.vite-loaded {
    opacity: 1 !important;
    visibility: visible !important;
}
```

## 🛠️ **Usage**

### **For New Pages:**
1. Create your HTML page
2. Run: `npm run update-pages`
3. Critical CSS is automatically added!

### **For Updates:**
1. Edit `assets/css/critical.css`
2. Changes apply to all pages automatically
3. No need to update individual files

### **Manual Addition:**
If you prefer manual control, add this to any page's `<head>`:
```html
<link rel="stylesheet" href="assets/css/critical.css">
```

## ✅ **Benefits**

- ✅ **No Code Duplication** - One file for all pages
- ✅ **Automatic Updates** - Script handles all pages
- ✅ **FOUC Prevention** - Critical styles load first
- ✅ **Easy Maintenance** - Update once, apply everywhere
- ✅ **Clean HTML** - No inline styles cluttering pages

## 🔧 **Commands**

```bash
# Update all pages with critical CSS
npm run update-pages

# Start development server
npm run dev

# Build for production
npm run build
```

## 📝 **Notes**

- Critical CSS is loaded **before** other stylesheets
- Loading indicator shows while styles load
- Content becomes visible only after styles are ready
- All pages automatically get FOUC protection

---

**🎉 No more FOUC, no more manual copying!**
