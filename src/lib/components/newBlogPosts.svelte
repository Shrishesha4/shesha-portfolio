<script lang="ts">
    import type { Blog } from '$lib/types';
    
    export let posts: Blog[] = [];
    export let error: string = '';
    export let onRetry: () => void;

    function truncateText(text: string, limit: number = 150): string {
        if (text.length <= limit) return text;
        return text.slice(0, limit).trim() + '...';
    }
</script>

<div>
    <h2 class="mt-6 mb-8 text-3xl font-bold text-neutral-900 dark:text-neutral-100">Latest Posts</h2>
    {#if error}
        <div class="mb-8 rounded-lg bg-red-50 p-4 text-center text-red-600 dark:bg-red-900/10 dark:text-red-400">
            {error}
            <button class="ml-4 text-sm underline" on:click={onRetry}>Try again</button>
        </div>
    {:else if posts.length > 0}
        <div class="space-y-6">
            {#each posts.slice(0, 4) as post}
                <a href={`/blogs/${post.slug}`} class="glass-card glass-card-hover block p-6">
                    <div class="flex items-start justify-between">
                        <div>
                            <h3 class="mb-2 text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                                {post.title}
                            </h3>
                            <p class="mb-2 text-sm font-light dark:font-thin text-neutral-900 dark:text-neutral-100">
                                {truncateText(post.description)}
                                <span class="text-primary-600 dark:text-primary-400 font-bold hover:underline mt-2 inline-block">
                                    Read more
                                </span>
                            </p>
                            <p class="line-clamp-2 text-xs font-thin text-neutral-600 dark:text-neutral-300">
                                {#each post.tags as t}
                                    {t} <br />
                                {/each}
                            </p>
                        </div>
                        <span class="text-xs text-neutral-500 dark:text-neutral-400">
                            {new Date(post.date).toLocaleDateString('en-US', {
                                month: 'short',
                                year: 'numeric'
                            })}
                        </span>
                    </div>
                </a>
            {/each}
        </div>
    {:else}
        <p class="text-center text-neutral-600 dark:text-neutral-400">
            No blog posts available yet.
        </p>
    {/if}
</div>