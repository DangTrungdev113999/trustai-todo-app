# Design System - Todo App UI Polish

## Aesthetic Vision
Modern, clean, minimalist. Professional yet approachable. Focus on clarity and usability.

## Color Palette

### Base Colors
```
Background:     bg-slate-50      /* Light neutral background */
Surface:        bg-white         /* Cards, inputs, elevated surfaces */
Border:         border-slate-200 /* Subtle borders */
```

### Text Colors
```
Primary:        text-slate-900   /* Headings, primary text */
Secondary:      text-slate-600   /* Body text, descriptions */
Muted:          text-slate-400   /* Placeholders, disabled states */
```

### Semantic Colors
```
Primary:        bg-blue-600      hover:bg-blue-700      /* Primary actions */
                text-blue-600    border-blue-600

Destructive:    bg-red-600       hover:bg-red-700       /* Delete actions */
                text-red-600     border-red-600

Success:        bg-emerald-600   hover:bg-emerald-700   /* Completed todos */
                text-emerald-600 border-emerald-600

Muted:          bg-slate-100     hover:bg-slate-200     /* Secondary actions */
                text-slate-700   border-slate-300
```

## Typography

### Font Family
```
Sans-serif stack: font-sans (Tailwind default: system fonts)
```

### Text Scales
```
Heading (Page title):     text-2xl font-bold text-slate-900
Subheading:              text-lg font-semibold text-slate-800
Body:                    text-base text-slate-700
Small:                   text-sm text-slate-600
Tiny (metadata):         text-xs text-slate-400
```

## Spacing System

### Container Padding
```
Mobile:  px-4 py-6
Desktop: px-6 py-8
Max-width: max-w-2xl mx-auto  /* Centered, readable width */
```

### Component Spacing
```
Between sections:    space-y-6
Between items:       space-y-3
Between elements:    gap-2 or gap-3
```

### Component Padding
```
Buttons:  px-4 py-2     (text-sm)
          px-5 py-2.5   (text-base)
Inputs:   px-3 py-2
Cards:    p-4 or p-6
```

## Component Styles

### Buttons

**Primary (Default)**
```
bg-blue-600 hover:bg-blue-700 text-white
font-medium px-4 py-2 rounded-lg
transition-colors duration-150
shadow-sm hover:shadow
focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
```

**Outline**
```
border border-slate-300 hover:border-slate-400
text-slate-700 hover:text-slate-900
bg-white hover:bg-slate-50
font-medium px-4 py-2 rounded-lg
transition-colors duration-150
focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
```

**Ghost (Minimal)**
```
text-slate-700 hover:text-slate-900
hover:bg-slate-100
font-medium px-3 py-2 rounded-lg
transition-colors duration-150
focus:outline-none focus:ring-2 focus:ring-slate-300
```

**Destructive**
```
bg-red-600 hover:bg-red-700 text-white
font-medium px-4 py-2 rounded-lg
transition-colors duration-150
shadow-sm hover:shadow
focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
```

**Icon Button (Small)**
```
p-2 rounded-md
text-slate-600 hover:text-slate-900
hover:bg-slate-100
transition-colors duration-150
focus:outline-none focus:ring-2 focus:ring-slate-300
```

### Inputs

**Text Input**
```
w-full px-3 py-2 rounded-lg
border border-slate-300
bg-white text-slate-900
placeholder:text-slate-400
focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
transition-colors duration-150
```

**Input with Error**
```
border-red-300 focus:ring-red-500
text-red-900
```

**Disabled Input**
```
bg-slate-50 text-slate-400 cursor-not-allowed
```

### Checkboxes
```
w-5 h-5 rounded border-slate-300
text-blue-600 focus:ring-blue-500
cursor-pointer
```

**Checked state:** bg-blue-600 border-blue-600

### Cards / Containers
```
bg-white rounded-lg border border-slate-200
shadow-sm hover:shadow-md
p-4 or p-6
transition-shadow duration-150
```

### Todo Items

**Default State**
```
bg-white border border-slate-200 rounded-lg p-4
flex items-center gap-3
hover:bg-slate-50 hover:border-slate-300
transition-colors duration-150
```

**Completed State**
```
bg-slate-50 border-slate-200
text-slate-400 line-through
```

### Filter Buttons (Tab-like)

**Inactive**
```
px-4 py-2 rounded-lg
text-slate-600 hover:text-slate-900
hover:bg-slate-100
font-medium text-sm
transition-colors duration-150
```

**Active**
```
px-4 py-2 rounded-lg
bg-blue-600 text-white
font-medium text-sm
shadow-sm
```

### Forms

**Label**
```
text-sm font-medium text-slate-700 mb-1.5
```

**Helper Text / Error**
```
text-sm text-slate-500    /* Helper */
text-sm text-red-600      /* Error */
mt-1.5
```

## Layout Guidelines

### Page Structure
```html
<div class="min-h-screen bg-slate-50">
  <div class="max-w-2xl mx-auto px-4 py-8">
    <!-- Page content -->
  </div>
</div>
```

### Form Layout
```
Labels: mb-1.5
Inputs: mb-4
Button group: flex gap-2 justify-end
```

### List Layout
```
<div class="space-y-2">
  <!-- Todo items -->
</div>
```

## Accessibility

- **Focus states:** All interactive elements have visible focus rings
- **Contrast:** Text meets WCAG AA (4.5:1 for body, 3:1 for large text)
- **Touch targets:** Minimum 44x44px for mobile (p-2 for icon buttons = ~44px)
- **Disabled states:** Clear visual difference + cursor-not-allowed

## Responsive Behavior

### Breakpoints
```
Mobile-first: Base styles for mobile
sm: (640px+)   Slightly larger padding
md: (768px+)   Two-column layouts if needed
lg: (1024px+)  Max content width enforced
```

### Mobile Optimizations
- Larger touch targets (min p-2 for buttons)
- Stack buttons vertically on very small screens if needed
- Comfortable spacing (gap-3, space-y-3)

## Animation / Transitions

**Preferred duration:** `duration-150` (subtle, snappy)

**Common transitions:**
```
transition-colors    /* Buttons, hovers */
transition-shadow    /* Cards, elevation changes */
transition-all       /* Multi-property (use sparingly) */
```

## Icons (if used)
Suggest: **Lucide React** (clean, consistent, Shadcn-compatible)
Size: `w-4 h-4` or `w-5 h-5`
Color: Inherit from parent text color

## Example Component Compositions

### Todo Item (Default)
```html
<div class="bg-white border border-slate-200 rounded-lg p-4 flex items-center gap-3 hover:bg-slate-50 hover:border-slate-300 transition-colors duration-150">
  <input type="checkbox" class="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500">
  <span class="flex-1 text-slate-900">Todo text</span>
  <button class="p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100">Edit</button>
  <button class="p-2 rounded-md text-red-600 hover:text-red-700 hover:bg-red-50">Delete</button>
</div>
```

### Filter Group
```html
<div class="flex gap-2 border-b border-slate-200 pb-3 mb-6">
  <button class="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium text-sm">All</button>
  <button class="px-4 py-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-medium text-sm">Active</button>
  <button class="px-4 py-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-medium text-sm">Completed</button>
</div>
```

### Input Form
```html
<div class="mb-4">
  <label class="block text-sm font-medium text-slate-700 mb-1.5">Add Todo</label>
  <input 
    type="text" 
    placeholder="What needs to be done?"
    class="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
  />
</div>
```

## Notes for Kai
- Use existing Tailwind config (no custom colors needed)
- Shadcn/ui components copy-paste directly into project
- Prioritize consistency: stick to this system across all pages
- Test on mobile: spacing should feel comfortable, not cramped
