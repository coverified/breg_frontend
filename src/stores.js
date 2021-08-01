import {writable} from 'svelte/store';

export const tagFilters = writable([]);

export const toggleTag = tag => {
    tagFilters.update(tags => {
        const tagSet = new Set(tags.map(tag => tag.id));

        if (tagSet.has(tag.id)) {
            return tags.filter(item => item.id !== tag.id);
        } else {
            return [...tags, tag];
        }
    });
}

export const clearTags = () => {
    tagFilters.update(() => {
        return []
    })
}
