# פרומפטים לתמונות, שיעור 10: מרווחים ובליטות

עשרה מקרים למשחק "תפסו את החריגה".

## מצב (6.9.2026)

**כל עשר התמונות מאושרות ובתיקייה** (6.9.2026, שלושה סבבים).

**הלקח המרכזי, והוא חל על כל משחק עתידי מהסוג הזה**: המודל לא מציית לעוגני קומפוזיציה במספרים. ביקשתי קיר גבול ב-80% מרוחב המסגרת ובשלושה נסיונות קיבלתי 66%, 71% ו-72%. לכן **כל אלמנט שהמיקום המדויק שלו נושא את התשובה יורד לשכבת ה-SVG ולא נוצר במודל.**

בפועל: קיר הגבול נמחק מהתמונות של 5 ו-6 ומצויר בשכבה. עכשיו הפרופורציה מדויקת בהגדרה, 40% מול 47.5%, ושתי התמונות הפכו לזוג אמיתי. אותו עיקרון כבר חל על קו הבניין ועל קווי המידה.

הסיבה לכישלון הייתה בפרומפט ולא במודל. הסבב הראשון ביקש גם
`straight-on elevation, no perspective distortion` וגם `projecting forward`. אלה
סותרים: בחזית ישרה אי אפשר לראות עומק, זו ההגדרה של חזית. **גובה נראה, קוטר נראה,
סוג נראה. עומק לא.**

לכן יש כאן שני בלוקי סגנון. מי שהשאלה שלו על גובה או על סוג מקבל **סצנה**. מי
שהשאלה שלו על עומק מקבל **חתך**, וזה גם מה שמטרת הלמידה הרביעית בשיעור דורשת:
"לשרטט פרט חתך תקני של בליטה בקו בניין".

## הרעיון: המודל מצייר, אנחנו כותבים את המידות

**התמונות נוצרות בלי שום טקסט ובלי שום מספר.** קו הבניין וקו המידה עם המספר מצוירים
מעל התמונה כשכבת SVG בזמן הצגה, לא בתוך התמונה. ככה המספר מדויק, העברית נכונה,
הטקסט נקרא בקורא מסך, ואפשר לשנות מידה בלי לייצר תמונה מחדש.

בסבב הראשון המודל צייר קווי מידה עם חצים בתמונה 10 למרות איסור מפורש. האיסור בבלוק
החתך מנוסח חזק יותר בגלל זה.

## איך להשתמש

1. לכל מקרה: להדביק את **בלוק הסגנון המתאים לו** ואז את הפרומפט של המקרה, כפרומפט אחד.
2. גודל **1536x1024** לרוחב.
3. לשמור בשם `blita01.jpg` עד `blita10.jpg`.
4. לשלוח אחת-אחת. אני בודק כל אחת לחוד.

---

## בלוק סגנון א': סצנה

למקרים 3, 4, 7, 8, 9. שאלות של גובה, של סוג ושל קוטר.

```
Flat vector architectural illustration of an Israeli residential street, seen from
across the street at a natural standing eye level. Clean geometric shapes, thick
confident outlines, strong readable silhouettes.

Off-white and sand-beige plaster facades, occasional Jerusalem-stone cladding, flat
concrete roofs with white water tanks and solar collectors, aluminium window frames,
olive-green shrubs and bougainvillea, a plain concrete sidewalk along the bottom.

Warm late-afternoon Mediterranean daylight, soft shadows, muted teal-blue sky.
Limited palette: sand beige, off-white plaster, terracotta, muted teal, warm amber.
The single element the question is about is rendered in warm amber so it reads
instantly as the subject. Everything else stays quiet and neutral.

Uncluttered. Generous empty space in the lower third, kept completely free of
objects, plants, vehicles or people, so a dimension line can be drawn there later.
Fill the entire frame edge to edge with the illustration. No blank margin, no border,
no empty panel on any side.

Must read clearly from the back of a lecture hall when projected.

1536x1024 landscape.

No text, no words, no letters, no numbers, no dimension lines, no arrows, no tick
marks, no measurement annotations of any kind, no logos, no signage lettering, no
house numbers, no readable writing anywhere in the image.
```

## בלוק סגנון ב': חתך

למקרים 1, 5, 6, 10. שאלות של עומק בליטה.

```
Flat vector architectural SECTION drawing, in the style of a clean building permit
detail. The building is cut vertically straight through, and we look at the cut face
from the side, so that anything projecting from the wall extends sideways across the
page and its depth is fully visible.

Layout, always the same: the cut building mass occupies the LEFT third of the frame,
drawn as a solid dark grey vertical band with a thin hatched edge where it is cut.
Floor slabs project as horizontal lines into the building mass. To the RIGHT of the
wall is open air over a ground line that runs across the bottom of the frame. The
projecting element extends horizontally to the right, away from the wall, rendered in
warm amber, and its full depth from the wall face to its outer tip is clearly visible.

Draw the ground as a simple horizontal line with light hatching beneath it. Where the
plot boundary matters, show a low boundary wall standing on that ground line further
to the right, drawn as a simple thin rectangle.

Muted architectural palette: dark charcoal grey for the cut structure, light warm grey
for surfaces seen beyond the cut, warm amber only for the element in question, a plain
off-white background. Thin precise lines, no shading, no texture, no sky, no plants,
no people, no cars, no scenery.

Empty space along the bottom quarter of the frame, below the ground line, left
completely blank so a dimension line can be drawn there later.

1536x1024 landscape.

This is a schematic line drawing. Absolutely no text, no words, no letters, no
numbers, no dimension lines, no arrows, no tick marks, no leader lines, no scale bars,
no measurement annotations, no title block, no drawing border. Any annotation at all
is a failure. Draw only the building geometry itself.
```

---

## המקרים

### 1. כרכוב עמוק מדי · חתך · **מאושרת, סבב 3**
מידה שתסומן: **0.95 מ'** · התשובה: חריגה, המותר עד 0.75 מ'

```
Section through the top of a three-storey building. At the roof level, a solid
decorative cornice block projects horizontally from the wall face into the open air on
the right, rendered in warm amber, drawn as a thick rectangular slab. Its horizontal
depth is roughly one and a half times its own vertical thickness, so it clearly reads
as a deep, heavy projection rather than a thin lip. Below it on the same wall face,
two thin window sills project only slightly, giving an obvious contrast in depth. The
roof slab and two floor slabs are visible inside the cut building mass.
```

### 2. סוכך כניסה חורג · סצנה · **מאושרת**
מידה: **3.50 מ'** · התשובה: חריגה, המותר עד 3.00 מ'

### 3. סוכך תקין עם עמוד תמיכה · סצנה · **מאושרת**
מידה: **2.80 מ'** · התשובה: חריגה, אבל לא בגלל העומק. אסור להעמיד עמוד תמיכה על הקרקע מחוץ לקו הבניין

### 4. שלט נמוך מדי · סצנה · **מאושרת, סבב 2**
מידה: **גובה 2.10 מ' מהמדרכה** · התשובה: חריגה, נדרש גובה חופשי של 2.40 מ' לפחות

בסבב הראשון השלט צויר שטוח על הקיר במקום ניצב אליו. הזווית של שלושת-רבעי פתרה את זה,
והשלט עכשיו בולט מעל המדרכה כמו דגל, עם הדמות שכמעט נוגעת בו. זה הפרומפט שעבד:

```
An Israeli shopping street seen at a three-quarter angle, looking down the sidewalk so
that the fronts of the buildings recede to one side and elements projecting from the
walls are clearly visible sticking out over the pavement. On the nearest ground-floor
shopfront, a flat rectangular sign board is mounted at right angles to the wall,
sticking straight out over the sidewalk like a flag, rendered in warm amber, completely
blank on both faces. The sign hangs low: a standing adult figure walking beneath it
would nearly touch it with a raised hand, and its underside is clearly lower than the
top of the shop's door frame. Include one simple standing human figure on the sidewalk
directly beneath the sign for scale, drawn as a plain silhouette.
```

### 5. מרפסת תקינה · חתך · **מאושרת, סבב 3**
מידה שתסומן: **בליטה 1.60 מ', מרווח קדמי 4.00 מ'** · התשובה: **תקין.** גם מתחת ל-2.00 וגם בדיוק 40% מהמרווח

זוג עם מקרה 6. שניהם חייבים לצאת באותה קומפוזיציה בדיוק, אחרת ההשוואה לא עובדת.
הסטודנט לא אמור לאמוד את ההפרש בעין אלא לחשב אותו מהמספרים שבשכבת הסימון, ולכן
דווקא חשוב ששתי התמונות ייראו כמעט זהות.

```
Section through a two-storey house. Compose it exactly as follows, and keep every one
of these positions, because this drawing is one of a matched pair:

The cut building mass fills the frame from the left edge to 35% of the frame width.
Its right side is the cut wall face, a clean vertical line at exactly 35%. The ground
line runs horizontally across the frame at 78% of the frame height, with light hatching
below it. Two floor slabs cross the building mass, the upper one at 45% of the frame
height.

A cantilevered balcony slab projects horizontally to the right from that upper floor
slab, rendered in warm amber, drawn as a plain rectangular slab of even thickness, not
tapered. Its outer tip reaches 53% of the frame width. A thin vertical railing stands
on its outer end.

A low boundary wall stands on the ground line at exactly 80% of the frame width, drawn
as a slim vertical rectangle about one sixth as tall as the building, and nothing else
occupies the space between the building wall and it. That space is empty air above the
ground line.

Everything from 80% to the right edge of the frame is empty background.
```

### 6. מרפסת שעוברת את ה-40% · חתך · **מאושרת, סבב 3**
מידה: **בליטה 1.90 מ', מרווח קדמי 4.00 מ'** · התשובה: חריגה. מתחת ל-2.00 מ' אבל 47.5% מהמרווח, והקטן מביניהם קובע

זוג עם מקרה 5. אותה קומפוזיציה, רק קצה המרפסת זז.

```
Section through a two-storey house. Compose it exactly as follows, and keep every one
of these positions, because this drawing is one of a matched pair:

The cut building mass fills the frame from the left edge to 35% of the frame width.
Its right side is the cut wall face, a clean vertical line at exactly 35%. The ground
line runs horizontally across the frame at 78% of the frame height, with light hatching
below it. Two floor slabs cross the building mass, the upper one at 45% of the frame
height.

A cantilevered balcony slab projects horizontally to the right from that upper floor
slab, rendered in warm amber, drawn as a plain rectangular slab of even thickness, not
tapered. Its outer tip reaches 56% of the frame width. A thin vertical railing stands
on its outer end.

A low boundary wall stands on the ground line at exactly 80% of the frame width, drawn
as a slim vertical rectangle about one sixth as tall as the building, and nothing else
occupies the space between the building wall and it. That space is empty air above the
ground line.

Everything from 80% to the right edge of the frame is empty background.
```

### 7. מרפסת נמוכה · סצנה · **מאושרת**
מידה: **תחתית המרפסת 2.20 מ' מהקרקע** · התשובה: חריגה, נדרשים 2.50 מ' לפחות

### 8. מרזב עבה · סצנה · **מאושרת**
מידה: **0.35 מ'** · התשובה: חריגה, המותר עד 0.20 מ'

### 9. מחסן קבוע במרווח · סצנה · **מאושרת**
אין מידה, זו שאלת סוג · התשובה: חריגה. במרווח מותרים גדר קלה, קיר תומך ומצללה, לא מבנה בנוי קבוע

### 10. אלמנט חיזוק תמ"א 38 חורג · חתך · **מאושרת, סבב 2**
מידה: **1.10 מ'** · התשובה: חריגה, המותר לאלמנטי חיזוק עד 0.75 מ'

```
Section through a four-storey apartment building undergoing seismic strengthening. The
original building is the cut mass on the left with four floor slabs. A new reinforced
concrete strengthening element has been added onto the outside of the wall: it appears
as a thick solid vertical column of concrete running the full height of the building,
standing clear of the original wall face and projecting into the open air on the right,
rendered in warm amber, with its own foundation footing on the ground line. Its
horizontal depth is clearly greater than the depth of the original balcony slabs, which
project from the same wall face on two of the floors and are drawn in plain grey for
comparison.
```

---

## מה יורד לשכבת ה-SVG

קו הבניין, קווי המידה, המספרים, **וקיר גבול המגרש**. כל מה שהמיקום שלו הוא התשובה.
המודל מצייר רק את הגיאומטריה של הבניין ואת הבליטה עצמה.

## מה אני בודק בכל תמונה

1. **האם היא סותרת את התשובה.** איור יפה שסותר גרוע משרטוט פשוט שנכון.
2. **האם העומק נראה** (בחתכים) או **האם הגובה נראה** (בסצנות).
3. **האם נכנס טקסט או קו מידה** למרות האיסור.
4. **האם נשאר רבע תחתון ריק** לקו המידה.
5. **האם יש שוליים ריקים בקצה.** בסבב הראשון היו בשש תמונות, עד 16% מהרוחב, וחתכתי אותן ידנית.

## מקורות

תקנה 4.03 לתוספת השנייה, תקנות התכנון והבניה (בקשה להיתר, תנאיו ואגרות), תש"ל-1970.
תקנה 4.09 לעניין מה מותר לבנות במרווח עצמו. תיקון 134 לעניין ביטול ההקלות.

כל המידות אומתו מול "מערך שיעור מאומת 10 - מרווחים ובליטות" של ארז. כלל הגזוזטרה
מנוסח שם "הקטן מביניהם קובע". איסור עמודי התמיכה מופיע במערך ולא באתר, ולכן מקרה 3
בנוי עליו.
