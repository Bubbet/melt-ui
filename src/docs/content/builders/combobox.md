---
title: Combobox
description:
  An input with an associated popup containing a list of options. Commonly used for autocomplete
  functionality and command palettes.
---

<script>
    import { APIReference, KbdTable, Preview } from '$docs/components'
    export let schemas
    export let keyboard
    export let snippets
    export let previews
</script>

## Anatomy

- **Input**: The input that opens, closes, filters the list, and displays the selected value from
  the list
- **Menu**: The popover menu
  - **Item**: The individual list item
  - **Label**: The label for the input
  - **Arrow**: An optional arrow element which points to the menu's input
- **Root**: The root container for the tags
  - **Tag**: The tag container for an individual tag
  - **Delete Trigger**: The button container, to delete an individual tag

## Example components

### Autocomplete Tags

Autocomplete tags allow the user to select multiple options and have them display as tags for easy removal. To create a
autocomplete tags, simply set the `multiple` prop to `true` on the `createCombobox` builder.

<Preview code={snippets.tags}>
    <svelte:component this={previews.tags} />
</Preview>


## API Reference

<APIReference {schemas} />

## Accessibility

Adheres to the
[Autocomplete/Combobox WAI-ARIA design pattern](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/)

<KbdTable {keyboard} />
