<template>
  <div class="tiptap-editor">
    <div v-if="editor" class="border-b border-gray-200 p-2 flex flex-wrap gap-2 bg-gray-50 rounded-t-lg">
      <button
        type="button"
        @click="editor.chain().focus().toggleBold().run()"
        :class="[
          'p-2 rounded hover:bg-gray-200 transition-colors',
          editor.isActive('bold') ? 'bg-blue-100 text-blue-700' : 'text-gray-700'
        ]"
        title="Bold"
      >
        <Icon name="ph:text-b-bold" class="w-5 h-5" />
      </button>
      <button
        type="button"
        @click="editor.chain().focus().toggleItalic().run()"
        :class="[
          'p-2 rounded hover:bg-gray-200 transition-colors',
          editor.isActive('italic') ? 'bg-blue-100 text-blue-700' : 'text-gray-700'
        ]"
        title="Italic"
      >
        <Icon name="ph:text-italic-bold" class="w-5 h-5" />
      </button>
      <button
        type="button"
        @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
        :class="[
          'p-2 rounded hover:bg-gray-200 transition-colors',
          editor.isActive('heading', { level: 1 }) ? 'bg-blue-100 text-blue-700' : 'text-gray-700'
        ]"
        title="Heading 1"
      >
        <Icon name="ph:text-h-one-bold" class="w-5 h-5" />
      </button>
      <button
        type="button"
        @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
        :class="[
          'p-2 rounded hover:bg-gray-200 transition-colors',
          editor.isActive('heading', { level: 2 }) ? 'bg-blue-100 text-blue-700' : 'text-gray-700'
        ]"
        title="Heading 2"
      >
        <Icon name="ph:text-h-two-bold" class="w-5 h-5" />
      </button>
      <button
        type="button"
        @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
        :class="[
          'p-2 rounded hover:bg-gray-200 transition-colors',
          editor.isActive('heading', { level: 3 }) ? 'bg-blue-100 text-blue-700' : 'text-gray-700'
        ]"
        title="Heading 3"
      >
        <Icon name="ph:text-h-three-bold" class="w-5 h-5" />
      </button>
      <button
        type="button"
        @click="editor.chain().focus().toggleBulletList().run()"
        :class="[
          'p-2 rounded hover:bg-gray-200 transition-colors',
          editor.isActive('bulletList') ? 'bg-blue-100 text-blue-700' : 'text-gray-700'
        ]"
        title="Bullet List"
      >
        <Icon name="ph:list-bullets-bold" class="w-5 h-5" />
      </button>
      <button
        type="button"
        @click="editor.chain().focus().toggleOrderedList().run()"
        :class="[
          'p-2 rounded hover:bg-gray-200 transition-colors',
          editor.isActive('orderedList') ? 'bg-blue-100 text-blue-700' : 'text-gray-700'
        ]"
        title="Ordered List"
      >
        <Icon name="ph:list-numbers-bold" class="w-5 h-5" />
      </button>
      <button
        type="button"
        @click="editor.chain().focus().toggleBlockquote().run()"
        :class="[
          'p-2 rounded hover:bg-gray-200 transition-colors',
          editor.isActive('blockquote') ? 'bg-blue-100 text-blue-700' : 'text-gray-700'
        ]"
        title="Blockquote"
      >
        <Icon name="ph:quotes-bold" class="w-5 h-5" />
      </button>
      <button
        type="button"
        @click="editor.chain().focus().setHorizontalRule().run()"
        class="p-2 rounded hover:bg-gray-200 transition-colors text-gray-700"
        title="Horizontal Rule"
      >
        <Icon name="ph:minus-bold" class="w-5 h-5" />
      </button>
      <button
        type="button"
        @click="editor.chain().focus().undo().run()"
        class="p-2 rounded hover:bg-gray-200 transition-colors text-gray-700"
        title="Undo"
      >
        <Icon name="ph:arrow-counter-clockwise-bold" class="w-5 h-5" />
      </button>
      <button
        type="button"
        @click="editor.chain().focus().redo().run()"
        class="p-2 rounded hover:bg-gray-200 transition-colors text-gray-700"
        title="Redo"
      >
        <Icon name="ph:arrow-clockwise-bold" class="w-5 h-5" />
      </button>
    </div>
    <EditorContent :editor="editor" class="prose prose-lg max-w-none" />
  </div>
</template>

<script setup lang="ts">
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'

interface Props {
  modelValue: string
  placeholder?: string
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'محتوا را اینجا بنویسید...',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const editor = useEditor({
  extensions: [
    StarterKit,
    Placeholder.configure({
      placeholder: props.placeholder,
    }),
  ],
  content: props.modelValue,
  editorProps: {
    attributes: {
      class: 'prose prose-lg max-w-none min-h-[400px] p-4 focus:outline-none border border-gray-300 rounded-b-lg',
    },
  },
  onUpdate: ({ editor }) => {
    emit('update:modelValue', editor.getHTML())
  },
})

watch(() => props.modelValue, (value) => {
  if (editor.value && editor.value.getHTML() !== value) {
    editor.value.commands.setContent(value || '')
  }
})

onBeforeUnmount(() => {
  editor.value?.destroy()
})
</script>

<style>
.tiptap-editor .ProseMirror {
  outline: none;
}

.tiptap-editor .ProseMirror p {
  margin: 1em 0;
}

.tiptap-editor .ProseMirror p.is-editor-empty:first-child::before {
  content: attr(data-placeholder);
  float: right;
  color: #adb5bd;
  pointer-events: none;
  height: 0;
}

.tiptap-editor .ProseMirror h1 {
  font-size: 2em;
  font-weight: bold;
  margin: 0.67em 0;
}

.tiptap-editor .ProseMirror h2 {
  font-size: 1.5em;
  font-weight: bold;
  margin: 0.75em 0;
}

.tiptap-editor .ProseMirror h3 {
  font-size: 1.17em;
  font-weight: bold;
  margin: 0.83em 0;
}

.tiptap-editor .ProseMirror ul,
.tiptap-editor .ProseMirror ol {
  padding-right: 2em;
  margin: 1em 0;
}

.tiptap-editor .ProseMirror blockquote {
  border-right: 4px solid #e5e7eb;
  padding-right: 1em;
  margin: 1em 0;
  font-style: italic;
}

.tiptap-editor .ProseMirror hr {
  border: none;
  border-top: 2px solid #e5e7eb;
  margin: 2em 0;
}
</style>



