import { ATTRS, KBD, PROPS, SEE } from '$docs/constants.js';
import type { KeyboardSchema } from '$docs/types.js';
import { builderSchema, elementSchema } from '$docs/utils/index.js';
import { comboboxEvents } from '$lib/builders/combobox/events.js';
import type { BuilderData } from './index.js';
import { getMenuArrowSchema } from './menu.js';
import {autocompleteTagsEvents} from "$lib/builders/autocomplete-tags/events";

/**
 * Props that are also returned in the form of stores via the `options` property.
 */
const OPTION_PROPS = [
	{
		name: 'scrollAlignment',
		type: ['"nearest"', '"center"'],
		default: '"nearest"',
		description: 'The alignment of the highlighted item when scrolling.',
	},
	PROPS.LOOP,
	PROPS.CLOSE_ON_OUTSIDE_CLICK,
	PROPS.CLOSE_ON_ESCAPE,
	PROPS.PREVENT_SCROLL,
	PROPS.PORTAL,
	PROPS.POSITIONING,
	PROPS.FORCE_VISIBLE,
];

const BUILDER_NAME = 'combobox';

const builder = builderSchema(BUILDER_NAME, {
	title: 'createCombobox',
	props: [
		{
			name: 'defaultSelected',
			type: 'ComboboxOption<T>',
			description: 'The initial selected item.',
		},
		{
			name: 'selected',
			type: 'Writable<ComboboxOption<T>>',
			description: 'A writable store that can be used to get or update the selected item.',
			see: SEE.BRING_YOUR_OWN_STORE,
		},
		{
			name: 'onSelectedChange',
			type: 'ChangeFn<ComboboxOption<T>>',
			description: 'A callback that is called when the selected item changes.',
			see: SEE.CHANGE_FUNCTIONS,
		},
		{
			name: 'multiple',
			type: 'boolean',
			default: 'false',
			description: 'Whether or not the combobox is a multiple combobox, required for tags.',
		},
		PROPS.DEFAULT_OPEN,
		PROPS.OPEN,
		PROPS.ON_OPEN_CHANGE,
		{
			name: 'debounce',
			type: 'number',
			default: '0',
			description: 'The debounce time for the inputValue.',
		},
		...OPTION_PROPS,
	],
	elements: [
		{
			name: 'menu',
			description: 'The builder store used to create the collapsible menu.',
		},
		{
			name: 'input',
			description: 'The builder store used to create the collapsible input.',
		},
		{
			name: 'item',
			description: 'The builder store used to create the menu item.',
		},
		{
			name: 'label',
			description: 'The builder store used to create the label for the combobox.',
		},
		{
			name: 'root',
			description: 'The builder store used to create the tags container root.',
		},
		{
			name: 'tag',
			description: 'The builder store used to create the tag.',
		},
		{
			name: 'deleteTrigger',
			description: 'The builder store used to create the tags delete trigger.',
		},
		{
			name: 'separator',
			description: 'The builder store used to create the combobox separator.',
		},
		{
			name: 'group',
			description: 'The builder store used to create the combobox group.',
		},
		{
			name: 'groupLabel',
			description: 'The builder store used to create the combobox group label.',
		},
	],
	states: [
		{
			name: 'open',
			type: 'Writable<boolean>',
			description: 'A writable store with the open state of the combobox menu.',
		},
		{
			name: 'inputValue',
			type: 'Writable<string>',
			description: 'A readable store with the value of the input.',
		},
		{
			name: 'touchedInput',
			type: 'Writable<boolean>',
			description: `A writable store with the touched state of the input. When the menu closes, the state is reset to \`false\`. 
			Whenever a key is pressed into the input, the state is set to \`true\`.`,
		},
		{
			name: 'selected',
			type: 'Writable<T>',
			description: 'A writable store whose value is the selected item.',
		},
		{
			name: 'highlighted',
			type: 'Writable<T>',
			description: 'A writable store whose value is the highlighted item.',
		},
	],
	helpers: [
		{
			name: 'isSelected',
			type: 'Readable<(item: T) => boolean>',
			description:
				'A derived store that returns a function that returns whether or not the item is selected.',
		},
		{
			name: 'isHighlighted',
			type: 'Readable<(item: T) => boolean>',
			description:
				'A derived store that returns a function that returns whether or not the item is highlighted.',
		},
	],
	options: OPTION_PROPS,
});

const menu = elementSchema('menu', {
	description: 'The combobox menu element',
	dataAttributes: [
		{
			name: 'data-melt-combobox-menu',
			value: ATTRS.MELT('menu'),
		},
	],
	events: comboboxEvents['menu'],
});

const input = elementSchema('input', {
	description:
		'The element that opens, closes, filters the list, and displays the selected value from the list.',
	dataAttributes: [
		{
			name: 'data-state',
			value: ATTRS.OPEN_CLOSED,
		},
		{
			name: 'data-disabled',
			value: ATTRS.DISABLED('`select`'),
		},
		{
			name: 'data-melt-combobox-input',
			value: ATTRS.MELT('input'),
		},
	],
	events: comboboxEvents['input'],
});

const item = elementSchema('item', {
	description: 'The menu item element',
	props: [
		{
			name: 'value',
			type: 'T',
			description: 'The value of the item.',
			required: true,
		},
		{
			name: 'label',
			type: 'string',
			description: 'The label of the item. When not present, the text content will be used.',
		},
		{
			name: 'disabled',
			type: 'boolean',
			default: 'false',
			description: 'Whether or not the `item` is disabled.',
		},
	],
	dataAttributes: [
		{
			name: 'data-disabled',
			value: ATTRS.DISABLED('`item`'),
		},
		{
			name: 'data-selected',
			value: ATTRS.SELECTED('`item`'),
		},
		{
			name: 'data-highlighted',
			value: ATTRS.HIGHLIGHTED(),
		},
		{
			name: 'data-melt-combobox-item',
			value: ATTRS.MELT('item'),
		},
	],
	events: comboboxEvents['item'],
});

const label = elementSchema('label', {
	description: 'The label element for the combobox',
	dataAttributes: [
		{
			name: 'data-melt-combobox-label',
			value: ATTRS.MELT('combobox label'),
		},
	],
});

const arrow = getMenuArrowSchema(BUILDER_NAME);

const separator = elementSchema('separator', {
	description: 'An optional separator element',
	dataAttributes: [
		{
			name: 'data-melt-select-separator',
			value: ATTRS.MELT('separator'),
		},
	],
});

const group = elementSchema('group', {
	description: 'A function which takes in a unique key to group options together.',
	props: [
		{
			name: 'key',
			type: 'string',
			description: 'A unique key for the group.',
		},
	],
	dataAttributes: [
		{
			name: 'data-melt-select-group',
			value: ATTRS.MELT('group'),
		},
	],
});

const groupLabel = elementSchema('groupLabel', {
	description: 'A function which takes in a unique key to group options together.',
	props: [
		{
			name: 'key',
			type: 'string',
			description: 'A unique key for the group.',
		},
	],
	dataAttributes: [
		{
			name: 'data-melt-select-group-label',
			value: ATTRS.MELT('group-label'),
		},
	],
});

const root = elementSchema('root', {
	description: 'The root autocomplete tags component.',
	dataAttributes: [
		{
			name: 'data-disabled',
			value: ATTRS.DISABLED('combobox input'),
		},
		{
			name: 'data-focus',
			value: 'Present if the tags input is focused.',
		},
		{
			name: 'data-melt-combobox-root',
			value: ATTRS.MELT('combobox input'),
		},
	],
	events: comboboxEvents['root'],
});

const tag = elementSchema('tag', {
	description: 'The tag components.',
	props: [
		{
			name: 'value',
			type: 'T',
			description: "The tag's value",
			required: true,
		},
		{
			name: 'label',
			type: 'string',
			description: 'The label of the tag. When not present, the text content will be used.',
		},
		{
			name: 'disabled',
			type: 'boolean',
			default: 'false',
			description: 'Whether or not the `tag` is disabled.',
		},
	],
	dataAttributes: [
		{
			name: 'data-tag-label',
			value: 'The label of the tag',
		},
		{
			name: 'data-tag-value',
			value: 'The value of the tag',
		},
		{
			name: 'data-disabled',
			value: ATTRS.DISABLED('tag'),
		},
		{
			name: 'data-selected',
			value: ATTRS.SELECTED('tag'),
		},
		{
			name: 'data-melt-combobox-tag',
			value: ATTRS.MELT('tag'),
		},
	],
	events: comboboxEvents['tag'],
});

const deleteTrigger = elementSchema('deleteTrigger', {
	description: 'The button component used to delete a tag.',
	props: [
		{
			name: 'value',
			type: 'T',
			description: "The tag's value",
			required: true,
		},
		{
			name: 'label',
			type: 'string',
			description: 'The label of the tag. When not present, the text content will be used.',
		},
		{
			name: 'disabled',
			type: 'boolean',
			default: 'false',
			description: 'Whether or not the `tag` is disabled.',
		},
	],
	dataAttributes: [
		{
			name: 'data-tag-value',
			value: 'The value of the tag associated with the delete trigger',
		},
		{
			name: 'data-tag-value',
			value: 'The value of the tag associated with the delete trigger.',
		},
		{
			name: 'data-disabled',
			value: ATTRS.DISABLED('delete trigger'),
		},
		{
			name: 'data-selected',
			value: ATTRS.SELECTED('delete trigger'),
		},
		{
			name: 'data-melt-combobox-delete-trigger',
			value: ATTRS.MELT('delete trigger'),
		},
	],
	events: comboboxEvents['deleteTrigger'],
});

const keyboard: KeyboardSchema = [
	{
		key: KBD.ENTER,
		behavior: 'selects the highlighted list item.',
	},
	{
		key: KBD.ARROW_DOWN,
		behavior: 'Highlights the next list item.',
	},
	// {
	// 	key: 'PageDown',
	// 	behavior: 'Highlights 10 list items down (or the end of the list).',
	// },
	{
		key: KBD.ARROW_UP,
		behavior: 'Highlights the previous list item.',
	},
	// {
	// 	key: 'PageUp',
	// 	behavior: 'Highlights 10 list items up (or the top of the list).',
	// },
	{
		key: KBD.HOME,
		behavior: 'Highlights the first list item',
	},
	{
		key: KBD.END,
		behavior: 'Highlights the last list item',
	},
	{
		key: KBD.ARROW_LEFT,
		behavior: 'Highlights the previous tag.',
	},
	{
		key: KBD.ARROW_RIGHT,
		behavior: 'Highlights the next tag.',
	},
	{
		key: KBD.ESCAPE,
		behavior:
			"When focus is on the `input` and it's closed, removes focus. When the `input` is open, closes the list.",
	},
];

const schemas = [builder, menu, input, item, label, arrow, separator, group, groupLabel, root, tag, deleteTrigger];

const features = [
	'Full keyboard navigation',
	'Declarative API',
	'Can be controlled or uncontrolled',
	'Custom positioning',
];

export const comboboxData: BuilderData = {
	schemas,
	features,
	keyboard,
};
