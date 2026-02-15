# GA4 Dashboard

ממשק להצגת נתוני Google Analytics 4 עם Next.js, React ו-TypeScript.

## תכונות

- 📊 תצוגת מדדי ביצוע מרכזיים (משתמשים, סשנים, צפיות בעמוד)
- 📈 גרפים אינטראקטיביים של מגמות לאורך זמן
- 📱 פילוח לפי מכשירים (Mobile, Desktop, Tablet)
- 🔍 מקורות תעבורה וניתוח דפים מובילים
- 🎨 עיצוב responsive עם תמיכה ב-dark mode
- 🇮🇱 ממשק בעברית (RTL)

## התקנה

```bash
# התקנת dependencies
npm install

# הרצת שרת הפיתוח
npm run dev

# גישה לממשק
# פתח דפדפן והיכנס ל-http://localhost:3000
```

## מבנה הפרויקט

```
├── app/
│   ├── components/          # קומפוננטות React
│   │   ├── MetricCard.tsx
│   │   ├── TimeSeriesChart.tsx
│   │   ├── TopPagesTable.tsx
│   │   ├── TrafficSources.tsx
│   │   └── DeviceBreakdown.tsx
│   ├── lib/                 # שירותים ועזרים
│   │   └── mockGA4Data.ts   # נתוני GA4 לדוגמה
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx             # דף ראשי
├── package.json
├── tsconfig.json
└── tailwind.config.ts
```

## טכנולוגיות

- **Next.js 15** - React framework עם App Router
- **TypeScript** - type safety
- **Tailwind CSS** - styling
- **Recharts** - data visualization
- **React** - UI library

## הוספת נתונים אמיתיים

כרגע הממשק משתמש בנתונים לדוגמה. כדי להתחבר ל-Google Analytics 4 האמיתי:

1. צור Service Account ב-Google Cloud Console
2. הפעל את Google Analytics Data API
3. הורד את קובץ ה-credentials
4. התקן את `@google-analytics/data`
5. החלף את `fetchGA4Data()` בקריאה אמיתית ל-API

## Scripts

- `npm run dev` - הרצת שרת פיתוח
- `npm run build` - build לייצור
- `npm start` - הרצת build
- `npm run lint` - בדיקת קוד

## רישיון

MIT
