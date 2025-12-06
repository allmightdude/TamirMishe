<template>
  <div>
    <label v-if="label" class="block text-sm font-medium text-gray-700 mb-2">{{ label }}</label>
    <ClientOnly>
      <div
        class="rounded-xl border border-gray-200 overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-shadow"
      >
        <div class="flex items-center gap-0 p-2 border-b border-gray-200 bg-gray-600">
          <button
            type="button"
            class="p-2 text-white hover:bg-gray-500 rounded"
            @click="undo"
            title="Undo"
          >
            <Icon name="ph:arrow-counter-clockwise-bold" class="w-4 h-4" />
          </button>

          <button
            type="button"
            class="p-2 text-white hover:bg-gray-500 rounded"
            @click="redo"
            title="Redo"
          >
            <Icon name="ph:arrow-clockwise-bold" class="w-4 h-4" />
          </button>

          <div class="w-px h-6 bg-gray-400 mx-1"></div>

          <div class="relative">
            <button
              type="button"
              class="p-2 text-white hover:bg-gray-500 rounded flex items-center gap-1"
              @click="toggleHeadingDropdown"
              title="Heading"
            >
              <span class="font-bold">H</span>
              <Icon name="ph:caret-down-bold" class="w-3 h-3" />
            </button>

            <div
              v-if="showHeadingDropdown"
              class="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded shadow-lg z-10 min-w-[120px]"
            >
              <button
                @click="setHeading(1)"
                class="block w-full px-3 py-2 text-right hover:bg-gray-100 text-sm"
              >
                Heading 1
              </button>
              <button
                @click="setHeading(2)"
                class="block w-full px-3 py-2 text-right hover:bg-gray-100 text-sm"
              >
                Heading 2
              </button>
              <button
                @click="setHeading(3)"
                class="block w-full px-3 py-2 text-right hover:bg-gray-100 text-sm"
              >
                Heading 3
              </button>
              <button
                @click="setParagraph"
                class="block w-full px-3 py-2 text-right hover:bg-gray-100 text-sm"
              >
                Paragraph
              </button>
            </div>
          </div>

          <div class="relative">
            <button
              type="button"
              class="p-2 text-white hover:bg-gray-500 rounded flex items-center gap-1"
              @click="toggleListDropdown"
              title="Lists"
            >
              <Icon name="ph:list-bullets-bold" class="w-4 h-4" />
              <Icon name="ph:caret-down-bold" class="w-3 h-3" />
            </button>

            <div
              v-if="showListDropdown"
              class="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded shadow-lg z-10 min-w-[140px]"
            >
              <button
                @click="toggleBulletList"
                class="block w-full px-3 py-2 text-right hover:bg-gray-100 text-sm"
              >
                Bullet List
              </button>
              <button
                @click="toggleOrderedList"
                class="block w-full px-3 py-2 text-right hover:bg-gray-100 text-sm"
              >
                Numbered List
              </button>
            </div>
          </div>

          <button
            type="button"
            class="p-2 text-white hover:bg-gray-500 rounded"
            @click="toggleBlockquote"
            :class="{ 'bg-gray-500': isActive.blockquote }"
            title="Blockquote"
          >
            <Icon name="ph:quotes-bold" class="w-4 h-4" />
          </button>

          <div class="w-px h-6 bg-gray-400 mx-1"></div>

          <button
            type="button"
            class="p-2 text-white hover:bg-gray-500 rounded font-bold"
            @click="toggleBold"
            :class="{ 'bg-gray-500': isActive.bold }"
            title="Bold"
          >
            B
          </button>

          <button
            type="button"
            class="p-2 text-white hover:bg-gray-500 rounded italic"
            @click="toggleItalic"
            :class="{ 'bg-gray-500': isActive.italic }"
            title="Italic"
          >
            I
          </button>

          <button
            type="button"
            class="p-2 text-white hover:bg-gray-500 rounded line-through"
            @click="toggleStrike"
            :class="{ 'bg-gray-500': isActive.strike }"
            title="Strikethrough"
          >
            S
          </button>

          <button
            type="button"
            class="p-2 text-white hover:bg-gray-500 rounded"
            @click="toggleCode"
            :class="{ 'bg-gray-500': isActive.code }"
            title="Inline Code"
          >
            <span class="text-xs">&lt;/&gt;</span>
          </button>

          <button
            type="button"
            class="p-2 text-white hover:bg-gray-500 rounded underline"
            @click="toggleUnderline"
            :class="{ 'bg-gray-500': isActive.underline }"
            title="Underline"
          >
            U
          </button>

          <div class="w-px h-6 bg-gray-400 mx-1"></div>

          <button
            type="button"
            class="p-2 text-white hover:bg-gray-500 rounded"
            @click="toggleHighlight"
            :class="{ 'bg-gray-500': isActive.highlight }"
            title="Highlight"
          >
            <Icon name="ph:paint-brush-bold" class="w-4 h-4" />
          </button>

          <button
            type="button"
            class="p-2 text-white hover:bg-gray-500 rounded"
            @click="setLink"
            :class="{ 'bg-gray-500': isActive.link }"
            title="Link"
          >
            <Icon name="ph:link-bold" class="w-4 h-4" />
          </button>

          <div class="w-px h-6 bg-gray-400 mx-1"></div>

          <button
            type="button"
            class="p-2 text-white hover:bg-gray-500 rounded"
            @click="toggleSuperscript"
            :class="{ 'bg-gray-500': isActive.superscript }"
            title="Superscript"
          >
            <span class="text-xs">x<sup>2</sup></span>
          </button>

          <button
            type="button"
            class="p-2 text-white hover:bg-gray-500 rounded"
            @click="toggleSubscript"
            :class="{ 'bg-gray-500': isActive.subscript }"
            title="Subscript"
          >
            <span class="text-xs">x<sub>2</sub></span>
          </button>

          <div class="w-px h-6 bg-gray-400 mx-1"></div>

          <button
            type="button"
            class="p-2 text-white hover:bg-gray-500 rounded"
            @click="setTextAlign('left')"
            :class="{ 'bg-gray-500': isActive.alignLeft }"
            title="Align Left"
          >
            <Icon name="ph:text-align-left-bold" class="w-4 h-4" />
          </button>

          <button
            type="button"
            class="p-2 text-white hover:bg-gray-500 rounded"
            @click="setTextAlign('center')"
            :class="{ 'bg-gray-500': isActive.alignCenter }"
            title="Align Center"
          >
            <Icon name="ph:text-align-center-bold" class="w-4 h-4" />
          </button>

          <button
            type="button"
            class="p-2 text-white hover:bg-gray-500 rounded"
            @click="setTextAlign('right')"
            :class="{ 'bg-gray-500': isActive.alignRight }"
            title="Align Right"
          >
            <Icon name="ph:text-align-right-bold" class="w-4 h-4" />
          </button>

          <div class="w-px h-6 bg-gray-400 mx-1"></div>

          <button
            type="button"
            class="px-3 py-1 text-white rounded flex items-center gap-2"
            @click="addImage"
            title="Add Image"
          >
            <Icon name="ph:image-bold" class="w-4 h-4" />
          </button>
        </div>

        <EditorContent
          :editor="editor"
          class="min-h-[300px] px-4 py-3 prose max-w-none rtl editor-content"
          @click="focusEditor"
        />
      </div>
    </ClientOnly>
    <p v-if="help" class="mt-1 text-xs text-gray-500">{{ help }}</p>
  </div>
</template>

<script setup lang="ts">
import { EditorContent, useEditor } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import Highlight from '@tiptap/extension-highlight'
import Link from '@tiptap/extension-link'
import Superscript from '@tiptap/extension-superscript'
import Subscript from '@tiptap/extension-subscript'
import Image from '@tiptap/extension-image'

interface Props {
  modelValue?: string
  label?: string
  placeholder?: string
  help?: string
}

const props = defineProps<Props>()
const emit = defineEmits<{ 'update:modelValue': [value: string] }>()

const showHeadingDropdown = ref(false)
const showListDropdown = ref(false)

const editor = useEditor({
  content: props.modelValue || '',
  extensions: [
    StarterKit.configure({
      heading: { levels: [1, 2, 3] },
    }),
    TextAlign.configure({
      types: ['heading', 'paragraph'],
      alignments: ['left', 'center', 'right'],
      defaultAlignment: 'right',
    }),
    Placeholder.configure({ placeholder: props.placeholder || 'محتوا را بنویسید...' }),
    Underline,
    Highlight.configure({ multicolor: true }),
    Link.configure({
      openOnClick: false,
      HTMLAttributes: {
        class: 'text-blue-500 underline cursor-pointer',
      },
    }),
    Superscript,
    Subscript,
    Image.configure({
      HTMLAttributes: {
        class: 'max-w-full h-auto rounded-lg',
      },
      allowBase64: true,
      inline: false,
    }),
  ],
  editable: true,
  onCreate: ({ editor }: { editor: any }) => {
    editor.setEditable(true)
  },
  onUpdate: ({ editor }: { editor: any }) => emit('update:modelValue', editor.getHTML()),
  editorProps: {
    attributes: {
      class:
        'focus:outline-none text-gray-800 leading-7 [&_*]:selection:bg-blue-100 [&_*]:selection:text-blue-900 cursor-text',
      dir: 'rtl',
    },
  },
})

watch(
  () => props.modelValue,
  (val: string | undefined) => {
    if (!editor?.value) return
    if ((val || '') !== editor.value.getHTML()) {
      editor.value.commands.setContent(val || '')
    }
  }
)

const noopChain = {
  run: () => {},
  setHeading: () => noopChain,
  setParagraph: () => noopChain,
  toggleBulletList: () => noopChain,
  toggleOrderedList: () => noopChain,
  toggleBold: () => noopChain,
  toggleItalic: () => noopChain,
  toggleStrike: () => noopChain,
  toggleCode: () => noopChain,
  toggleUnderline: () => noopChain,
  toggleHighlight: () => noopChain,
  setLink: () => noopChain,
  toggleSuperscript: () => noopChain,
  toggleSubscript: () => noopChain,
  setTextAlign: () => noopChain,
  undo: () => noopChain,
  redo: () => noopChain,
  insertContent: () => noopChain,
  toggleBlockquote: () => noopChain,
} as any

const chain = computed<any>(() => {
  if (!editor?.value) return noopChain
  return editor.value.chain().focus()
})

const isActive = reactive({
  get paragraph() {
    return !!editor?.value?.isActive('paragraph')
  },
  get bold() {
    return !!editor?.value?.isActive('bold')
  },
  get italic() {
    return !!editor?.value?.isActive('italic')
  },
  get strike() {
    return !!editor?.value?.isActive('strike')
  },
  get code() {
    return !!editor?.value?.isActive('code')
  },
  get underline() {
    return !!editor?.value?.isActive('underline')
  },
  get highlight() {
    return !!editor?.value?.isActive('highlight')
  },
  get link() {
    return !!editor?.value?.isActive('link')
  },
  get superscript() {
    return !!editor?.value?.isActive('superscript')
  },
  get subscript() {
    return !!editor?.value?.isActive('subscript')
  },
  get blockquote() {
    return !!editor?.value?.isActive('blockquote')
  },
  get bulletList() {
    return !!editor?.value?.isActive('bulletList')
  },
  get orderedList() {
    return !!editor?.value?.isActive('orderedList')
  },
  get alignRight() {
    return !!editor?.value?.isActive({ textAlign: 'right' })
  },
  get alignCenter() {
    return !!editor?.value?.isActive({ textAlign: 'center' })
  },
  get alignLeft() {
    return !!editor?.value?.isActive({ textAlign: 'left' })
  },
})

const toggleHeadingDropdown = () => {
  showHeadingDropdown.value = !showHeadingDropdown.value
  showListDropdown.value = false
}

const toggleListDropdown = () => {
  showListDropdown.value = !showListDropdown.value
  showHeadingDropdown.value = false
}

const setHeading = (level: 1 | 2 | 3) => {
  if (editor?.value) {
    try {
      const success = editor.value.chain().focus().setHeading({ level: level as 1 | 2 | 3 }).run()
      if (!success) {
        editor.value.commands.setHeading({ level: level as 1 | 2 | 3 })
      }
    } catch (error) {}
  }
  showHeadingDropdown.value = false
}

const setParagraph = () => {
  if (editor?.value) {
    try {
      const success = editor.value.chain().focus().setParagraph().run()
      if (!success) {
        editor.value.commands.setParagraph()
      }
    } catch (error) {}
  }
  showHeadingDropdown.value = false
}

const toggleBulletList = () => {
  if (editor?.value) {
    editor.value.chain().focus().toggleBulletList().run()
  }
  showListDropdown.value = false
}

const toggleOrderedList = () => {
  if (editor?.value) {
    editor.value.chain().focus().toggleOrderedList().run()
  }
  showListDropdown.value = false
}

const setLink = () => {
  const url = window.prompt('Enter URL:')
  if (url && editor?.value) {
    editor.value.chain().focus().setLink({ href: url }).run()
  }
}

const setTextAlign = (alignment: 'left' | 'center' | 'right') => {
  if (editor?.value) {
    try {
      const success = editor.value.chain().focus().setTextAlign(alignment).run()
      if (!success) {
        editor.value.commands.setTextAlign(alignment)
      }
    } catch (error) {}
  }
}

const toggleBold = () => {
  if (editor?.value) {
    try {
      editor.value.chain().focus().toggleBold().run()
    } catch (error) {}
  }
}

const toggleItalic = () => {
  if (editor?.value) {
    try {
      editor.value.chain().focus().toggleItalic().run()
    } catch (error) {}
  }
}

const toggleStrike = () => {
  if (editor?.value) {
    try {
      editor.value.chain().focus().toggleStrike().run()
    } catch (error) {}
  }
}

const toggleCode = () => {
  if (editor?.value) {
    try {
      editor.value.chain().focus().toggleCode().run()
    } catch (error) {}
  }
}

const toggleUnderline = () => {
  if (editor?.value) {
    try {
      editor.value.chain().focus().toggleUnderline().run()
    } catch (error) {}
  }
}

const toggleHighlight = () => {
  if (editor?.value) {
    try {
      editor.value.chain().focus().toggleHighlight().run()
    } catch (error) {}
  }
}

const toggleBlockquote = () => {
  if (editor?.value) {
    try {
      editor.value.chain().focus().toggleBlockquote().run()
    } catch (error) {}
  }
}

const undo = () => {
  if (editor?.value) {
    try {
      editor.value.chain().focus().undo().run()
    } catch (error) {}
  }
}

const redo = () => {
  if (editor?.value) {
    try {
      editor.value.chain().focus().redo().run()
    } catch (error) {}
  }
}

const toggleSuperscript = () => {
  if (editor?.value) {
    try {
      editor.value.chain().focus().toggleSuperscript().run()
    } catch (error) {}
  }
}

const toggleSubscript = () => {
  if (editor?.value) {
    try {
      editor.value.chain().focus().toggleSubscript().run()
    } catch (error) {}
  }
}

const focusEditor = () => {
  if (editor?.value) {
    editor.value.commands.focus()
  }
}

const addImage = () => {
  if (editor?.value) {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = (event) => {
      const file = (event.target as HTMLInputElement).files?.[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const imageUrl = e.target?.result as string
          if (imageUrl) {
            editor.value?.chain().focus().setImage({ src: imageUrl }).run()
          }
        }
        reader.readAsDataURL(file)
      }
    }
    input.click()
  }
}

onMounted(() => {
  document.addEventListener('click', (e: any) => {
    if (!e.target?.closest('.relative')) {
      showHeadingDropdown.value = false
      showListDropdown.value = false
    }
  })

  nextTick(() => {
    if (editor?.value) {
      editor.value.setEditable(true)
    }
  })
})

onBeforeUnmount(() => {
  if (editor?.value) {
    editor.value.destroy()
  }
})
</script>

<style scoped>
.editor-content :deep(.tiptap [style*='text-align: left']) {
  text-align: left !important;
}

.editor-content :deep(.tiptap [style*='text-align: center']) {
  text-align: center !important;
}

.editor-content :deep(.tiptap [style*='text-align: right']) {
  text-align: right !important;
}

.editor-content :deep(.tiptap) {
  direction: rtl;
}

.editor-content :deep(.tiptap [style*='text-align: left']) {
  direction: ltr;
}

.editor-content :deep(.tiptap [style*='text-align: center']) {
  direction: rtl;
}

.editor-content :deep(.tiptap [style*='text-align: right']) {
  direction: rtl;
}

.editor-content :deep(.tiptap img) {
  max-width: 100%;
  height: auto;
  border-radius: 0.5rem;
  margin: 1rem auto;
  display: block;
  cursor: pointer;
  background: #f3f4f6;
  min-height: 50px;
}

.editor-content :deep(.tiptap img:hover) {
  opacity: 0.9;
}

.editor-content :deep(.tiptap) img {
  visibility: visible !important;
  opacity: 1 !important;
}

.editor-content :deep(.tiptap) {
  cursor: text;
  min-height: 300px;
}

.editor-content :deep(.ProseMirror) {
  cursor: text !important;
  outline: none;
}

.editor-content :deep(.ProseMirror:focus) {
  outline: none;
}

.editor-content :deep(.tiptap p.is-editor-empty:first-child::before) {
  content: attr(data-placeholder);
  float: right;
  color: #9ca3af;
  pointer-events: none;
  height: 0;
}

.editor-content :deep(.tiptap p) {
  margin: 0.5rem 0;
  line-height: 1.6;
}

.editor-content :deep(.tiptap br) {
  display: block;
  content: '';
  margin: 0.25rem 0;
}

.editor-content :deep(.tiptap h1),
.editor-content :deep(.tiptap h2),
.editor-content :deep(.tiptap h3) {
  margin: 1rem 0 0.5rem 0;
  line-height: 1.4;
}

.editor-content :deep(.tiptap ul),
.editor-content :deep(.tiptap ol) {
  margin: 0.5rem 0;
  padding-right: 1.5rem;
}

.editor-content :deep(.tiptap li) {
  margin: 0.25rem 0;
}
</style>

