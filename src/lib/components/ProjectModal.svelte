<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import type { Project } from '$lib/stores/projects';
	import ImageUpload from './ImageUpload.svelte';

    export let show = false;
    
    const dispatch = createEventDispatcher();
    let project: Project = {
        id: crypto.randomUUID(),
        title: '',
        description: '',
        image: '',
        technologies: [],
        url: '',
        github: ''
    };

    function handleSubmit() {
        dispatch('save', project);
        show = false;
        project = {
            id: crypto.randomUUID(),
            title: '',
            description: '',
            image: '',
            technologies: [],
            url: '',
            github: ''
        };
    }

    function handleClose() {
        show = false;
    }
</script>

<!-- svelte-ignore a11y_label_has_associated_control -->
{#if show}
    <div class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div class="glass-card rounded-lg shadow-xl w-full max-w-lg max-h-[80vh] flex flex-col">
            <div class="p-6 overflow-y-auto">
                <h2 class="text-2xl font-bold text-neutral-100 mb-4">Add New Project</h2>
                <form on:submit|preventDefault={handleSubmit} class="space-y-3">
                    
                    <div>
                        <label class="block mb-1 text-neutral-100">Title</label>
                        <input 
                            type="text" 
                            bind:value={project.title}
                            required
                            class="glass-card-hover w-full px-3 mt-2 py-2 rounded-lg bg-gray-200/10 dark:bg-black/10 backdrop-blur-md border border-gray-800/20 dark:border-neutral-700/30 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                        />
                    </div>

                    <div>
                        <label class="block mb-1 text-neutral-100">Description</label>
                        <textarea 
                            bind:value={project.description}
                            required
                            class="glass-card-hover w-full px-3 mt-2 py-2 rounded-lg bg-gray-200/10 dark:bg-black/10 backdrop-blur-md border border-gray-800/20 dark:border-neutral-700/30 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                            rows="3"
                        ></textarea>
                    </div>

                    <div>
                        <label class="block mb-1 text-neutral-100">Project Image</label>
                        <ImageUpload
                            currentImage={project.image}
                            onImageUploaded={(url) => project.image = url}
                        />
                    </div>

                    <div>
                        <label class="block mb-1 text-neutral-100">Project URL</label>
                        <input 
                            type="url" 
                            bind:value={project.url}
                            class="glass-card-hover w-full px-3 mt-2 py-2 rounded-lg bg-gray-200/10 dark:bg-black/10 backdrop-blur-md border border-gray-800/20 dark:border-neutral-700/30 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                        />
                    </div>

                    <div>
                        <label class="block mb-1 text-neutral-100">GitHub URL</label>
                        <input 
                            type="url" 
                            bind:value={project.github}
                            class="glass-card-hover w-full px-3 mt-2 py-2 rounded-lg bg-gray-200/10 dark:bg-black/10 backdrop-blur-md border border-gray-800/20 dark:border-neutral-700/30 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                        />
                    </div>

                    <div>
                        <label class="block mb-1 text-neutral-100">Technologies (comma-separated)</label>
                        <input 
                            type="text" 
                            on:input={(e) => {
                                if (e.target) {
                                    project.technologies = (e.target as HTMLInputElement).value
                                        .split(',')
                                        .map(t => t.trim())
                                        .filter(Boolean);
                                }
                            }}
                            class="glass-card-hover w-full px-3 mt-2 py-2 rounded-lg bg-gray-200/10 dark:bg-black/10 backdrop-blur-md border border-gray-800/20 dark:border-neutral-700/30 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                        />
                    </div>

                    <div class="flex justify-end gap-3 mt-6">
                        <button 
                            type="button"
                            on:click={handleClose}
                            class="px-4 py-2 border border-neutral-300 dark:border-neutral-600 bg-red-600 hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-800 text-white px-4 py-2 rounded transition-colors duration-200"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit"
                            class="px-4 py-2 border border-neutral-300 dark:border-neutral-600 bg-primary-600 hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-800 text-white dark:text-white px-4 py-2 rounded transition-colors duration-200"
                        >
                            Add Project
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
{/if}