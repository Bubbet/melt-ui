import type { GroupedEvents, MeltComponentEvents } from '$lib/internal/types.js';

export const comboboxEvents = {
	input: ['click', 'keydown', 'input'] as const,
	menu: ['pointerleave'] as const,
	item: ['pointermove', 'click'] as const,
	root: ['mousedown'] as const,
	tag: ['mousedown', 'click'] as const,
	deleteTrigger: ['click', 'keydown'] as const,
};

export type ComboboxEvents = GroupedEvents<typeof comboboxEvents>;
export type ComboboxComponentEvents = MeltComponentEvents<ComboboxEvents>;
