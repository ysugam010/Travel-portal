# Travel Portal - Style Guide

This document outlines the design system used in the Travel Portal project.  
It includes fonts, colors, spacing, button styles, cards, inputs, and other component details.



# 1. Fonts
- Font Family: Tailwind default: font-sans  
- Label Font Size: text-sm  
- Paragraph Font Size: text-md (desktop: md:text-lg)  
- Heading Font Size: text-4xl (desktop: md:text-5xl)  
- Button Text: text-sm (font-normal for neutral, font-semibold for primary)  


# 2. Colors
- Primary Color: blue-500  
- Primary Hover: blue-600  
- Secondary Color:  
  - Text: gray-600  
  - Background for popovers/cards: slate-900  
- Card Background: bg-white/90 with backdrop-blur-sm and text-black  
- Popover Border: border-slate-700 (dark mode)  
- Overlay / Background: Hero uses bg-black opacity-40 over image  
- Tab Selected: border-black bg-white text-black  
- Tab Unselected: border-gray-300 text-gray-600  


# 3. Buttons
- Default Height: h-10  
- Padding: px-2 (default), h-8 w-8 for icon buttons  
- Font Weight: font-normal  
- Search Button:  
  - w-full md:w-auto  
  - h-10  
  - bg-blue-500 hover:bg-blue-600  
  - text-white font-semibold  
  - rounded-md transition-all  
- Calendar Button Gap: gap-[2px] between icon and date text  
- Icon Buttons: h-8 w-8 flex items-center justify-center rounded-full text-blue-500 hover:bg-blue-100  


# 4. Cards & Popovers
- Card Background: bg-white/90 backdrop-blur-sm text-black  
- Card Padding: p-4  
- Popover / Dropdown:  
  - Calendar: p-0 bg-white text-black border-gray-200  
  - Room / Passenger: p-4 bg-slate-900 text-white border-slate-700  
- Border Radius: rounded-lg or rounded-xl for consistency  
- Shadow: shadow-md for depth  


# 5. Form & Input Layout
- Input Height: h-10  
- Input Padding:  
  - With icon: pl-7  
  - Without icon: px-2  
  - Right-aligned inputs: pr-7  
- Border: border border-gray-300 rounded-md  
- Gap Between Fields: gap-1 to gap-3 depending on layout  
- Grid Gap: gap-3 for mobile, gap-4 for desktop layouts  
- Text Alignment: Default left (text-left), “To” field right (text-right)  
- Focus State: Tailwind default ring and outline  


# 6. Tabs
- Height: h-10  
- Font Size: text-sm font-medium  
- Default: px-4 py-1.5 text-gray-600 rounded-md border border-gray-300 transition-all  
- Selected (active): border-black bg-white text-black shadow-sm  
- Transition: Smooth with transition-all  



# 7. Icons
- Flight Icons (PlaneTakeoff / PlaneLanding): 16px  
- Calendar Icon: 16px  
- User Icon: 16px  
- MapPin Icon: 20px  
- Plus / Minus Icons: 16px  
- Icon Color: text-blue-500  
- Positioning: absolute left-2.5 top-1/2 -translate-y-1/2  



# 8. Hero Section
- Container: relative h-[500px] w-full  
- Overlay: absolute inset-0 bg-black opacity-40  
- Content Wrapper: absolute inset-0 flex flex-col items-center justify-center text-center text-white  
- Heading: text-4xl md:text-5xl font-bold mb-4  
- Description: text-md md:text-lg mb-8  
- Buttons and Forms centered vertically and horizontally  



# 9. Room & Passenger Popover
- Background: bg-slate-900 text-white border border-slate-700 p-4 rounded-lg  
- Label: text-sm font-medium text-gray-300  
- Count Text: text-md font-semibold  
- Icon Buttons: h-8 w-8 rounded-full text-blue-500 hover:bg-blue-600 hover:text-white  
- Gap: gap-3 between rows  



# 10. Responsive Rules
- Base (sm): Stacked form layout with gap-3  
- md: Horizontal layout for search forms  
- lg / xl: Increased padding and spacing for forms  
- Hero text scales using md: prefixes  


