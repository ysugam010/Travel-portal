# Travel Portal - Style Guide

This document outlines the design system used in the Travel Portal project. It includes fonts, colors, spacing, button styles, cards, inputs, and other component details.


# 1. Fonts
- Font Family: Tailwind default: font-sans
- Label Font Size: text-sm
- Paragraph Font Size: text-md (desktop: md:text-lg)
- Heading Font Size: text-4xl (desktop: md:text-5xl)



# 2. Colors
- Primary Color: blue-500
- Secondary Color: 
  - Text: gray-600
  - Background for popovers/cards: slate-900
- Card Background: bg-white/90 with backdrop-blur-sm and text-black
- Overlay / Background: Hero: bg-black opacity-40 over image



# 3. Buttons
- Default Height: h-10
- Padding: px-2 (default), h-8 w-8 for icon buttons
- Font Weight: font-normal
- Search Button: w-full md:w-auto h-10 bg-blue-500 hover:bg-blue-600 text-white font-semibold
- Calendar Button Gap: gap-[2px] between icon and date text



# 4. Cards & Popovers
- Card Padding: p-4
- Popover / Dropdown Padding: p-0 (calendar), p-4 (room/passenger selection)


# 5. Form & Input Layout
- Input Padding: 
  - With icon: pl-7
  - Otherwise: px-2
  - Right-aligned inputs: pr-7
- Input Height: h-10
- Gap Between Fields: gap-1 to gap-3 depending on layout
- Grid Gap: gap-3 for main forms, gap-4 for desktop layouts
- Text Alignment: Default left (text-left), “To” field right (text-right)



# 6. Tabs
- Height: h-10
- Font Size: text-sm font-medium
- Selected: border-black border
- Unselected: border-gray-300



# 7. Icons
- Flight/Calendar/User icons: 16px
- MapPin (package section): 20px


