<script lang="ts">
    import { onMount } from 'svelte';
    
    let error: Error | null = null;
    let errorDetails = '';
    
    onMount(() => {
        window.addEventListener('error', (e: ErrorEvent) => {
            error = e.error;
            errorDetails = e.error?.message || 'An unexpected error occurred';
            console.error('Caught error:', {
                message: e.error?.message,
                stack: e.error?.stack,
                name: e.error?.name
            });
        });

        return () => {
            window.removeEventListener('error', () => {});
        };
    });

    function handleRetry() {
        error = null;
        errorDetails = '';
        window.location.reload();
    }
</script>

{#if error}
    <div class="min-h-[200px] flex items-center justify-center">
        <div class="bg-red-50 dark:bg-red-900/10 p-4 rounded-lg text-center">
            <h3 class="text-red-600 dark:text-red-400 font-medium mb-2">Something went wrong</h3>
            <p class="text-red-500 dark:text-red-300 text-sm">{error.message}</p>
            <button 
                class="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                on:click={() => window.location.reload()}
            >
                Reload Page
            </button>
        </div>
    </div>
{:else}
    <slot />
{/if}