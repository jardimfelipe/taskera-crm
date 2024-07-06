// import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextAlign from '@tiptap/extension-text-align'
// import TextStyle from '@tiptap/extension-text-style'
import { BubbleMenu, Editor, EditorContent, EditorProvider, FloatingMenu, useCurrentEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { AlignCenter, AlignLeft, AlignRight, Bold, Code, Heading1, Heading2, Heading3, Heading4, Heading5, Heading6, Italic, List, ListOrdered, Pilcrow, Quote, Redo, Strikethrough, Undo } from 'lucide-react'
import React, { PropsWithChildren } from 'react'

import { cn } from "@/lib/utils";

import { Button as UiButton, ButtonProps } from './button'

interface Props extends ButtonProps {
  isActive?: boolean
}

export const editorProps = {
  attributes: {
    class: 'p-5 focus:outline-none min-h-48 border border-t-0',
    role: 'textbox',
    'aria-label': 'Rich Text Editor',
    'aria-multiline': 'true',
  }
}

export const extensions = [
  TextAlign.configure({
    types: ['heading', 'paragraph'],
  }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false,
      HTMLAttributes: {
        class: 'list-disc list-outside pl-5',
      }
    },
    codeBlock: {
      HTMLAttributes: {
        class: 'p-2 bg-gray-100 text-sm font-mono rounded-md overflow-x-auto language-markup',
      }
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
      HTMLAttributes: {
        class: 'list-decimal list-outside pl-5',
      }
    },
    heading: {
      HTMLAttributes: {
        class: 'font-bold'
      }
    }
  }),
]


const Button = ({ children, isActive, onClick, ...props }: PropsWithChildren<Props>) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    onClick?.(e)
  }
  return (
    <UiButton onClick={handleClick} className={cn("rounded-none", isActive && "bg-gray-100")} variant="ghost" size="icon" {...props}>
      {children}
    </UiButton>
  )
}

const MenuBar: React.FC<{ editor: Editor }> = ({ editor }) => {
  if (!editor) {
    return null
  }

  return (
    <div className="flex border">
      <Button
        onClick={(e) => editor.chain().focus().toggleBold().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleBold()
            .run()
        }
        isActive={editor.isActive('bold')}
      >
        <Bold className="text-black w-5 h-5" />
      </Button>
      <Button
        onClick={(e) => editor.chain().focus().toggleItalic().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleItalic()
            .run()
        }
        isActive={editor.isActive('italic')}
      >
        <Italic className='h-5 w-5 text-black' />
      </Button>
      <Button
        onClick={(e) => editor.chain().focus().toggleStrike().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleStrike()
            .run()
        }
        isActive={editor.isActive('strike')}
      >
        <Strikethrough className='h-5 w-5 text-black' />
      </Button>
      <Button
        onClick={(e) => editor.chain().focus().setParagraph().run()}
        isActive={editor.isActive('paragraph')}
      >
        <Pilcrow className='h-5 w-5 text-black' />
      </Button>
      <Button
        onClick={(e) => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        isActive={editor.isActive('heading', { level: 1 })}
      >
        <Heading1 className='h-5 w-5 text-black' />
      </Button>
      <Button
        onClick={(e) => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        isActive={editor.isActive('heading', { level: 2 })}
      >
        <Heading2 className='h-5 w-5 text-black' />
      </Button>
      <Button
        onClick={(e) => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        isActive={editor.isActive('heading', { level: 3 })}
      >
        <Heading3 className='h-5 w-5 text-black' />
      </Button>
      <Button
        onClick={(e) => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        isActive={editor.isActive('heading', { level: 4 })}
      >
        <Heading4 className='h-5 w-5 text-black' />
      </Button>
      <Button
        onClick={(e) => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        isActive={editor.isActive('heading', { level: 5 })}
      >
        <Heading5 className='h-5 w-5 text-black' />
      </Button>
      <Button
        onClick={(e) => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        isActive={editor.isActive('heading', { level: 6 })}
      >
        <Heading6 className='h-5 w-5 text-black' />
      </Button>
      <Button
        onClick={(e) => editor.chain().focus().toggleBulletList().run()}
        isActive={editor.isActive('bulletList')}
      >
        <List className='h-5 w-5 text-black' />
      </Button>
      <Button
        onClick={(e) => editor.chain().focus().toggleOrderedList().run()}
        isActive={editor.isActive('orderedList')}
      >
        <ListOrdered className='h-5 w-5 text-black' />
      </Button>
      <Button
        onClick={(e) => editor.chain().focus().toggleCodeBlock().run()}
        isActive={editor.isActive('codeBlock')}
      >
        <Code className='h-5 w-5 text-black' />
      </Button>
      <Button
        onClick={(e) => editor.chain().focus().toggleBlockquote().run()}
        isActive={editor.isActive('blockquote')}
      >
        <Quote className='h-5 w-5 text-black' />
      </Button>
      <Button
        onClick={(e) => editor.chain().focus().setTextAlign('left').run()}
        isActive={editor.isActive({ textAlign: 'left' })}
      >
        <AlignLeft className='h-5 w-5 text-black' />
      </Button>
      <Button
        onClick={(e) => editor.chain().focus().setTextAlign('center').run()}
        isActive={editor.isActive({ textAlign: 'center' })}
      >
        <AlignCenter className='h-5 w-5 text-black' />
      </Button>
      <Button
        onClick={(e) => editor.chain().focus().setTextAlign('right').run()}
        isActive={editor.isActive({ textAlign: 'right' })}
      >
        <AlignRight className='h-5 w-5 text-black' />
      </Button>
      <Button
        onClick={(e) => editor.chain().focus().setTextAlign('justify').run()}
        isActive={editor.isActive({ textAlign: 'justify' })}>
        <AlignCenter className='h-5 w-5 text-black' />
      </Button>
      <Button
        onClick={(e) => editor.chain().focus().undo().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .undo()
            .run()
        }
      >
        <Undo className='h-5 w-5 text-black' />
      </Button>
      <Button
        onClick={(e) => editor.chain().focus().redo().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .redo()
            .run()
        }
      >
        <Redo className='h-5 w-5 text-black' />
      </Button>
    </div >
  )
}

type EditorProps = {
  error?: string[]
  editor: Editor | null
}

const RichTextEditor = ({ error, editor }: EditorProps) => {
  if (!editor) return null
  return (
    <div className="flex flex-col gap-2">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
      {error ? (
        <div className="flex flex-col gap-1">
          {error.map((error, index) => (
            <span key={`editor-${index}`} className="text-xs text-red-500">
              {error}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  )
}

export { RichTextEditor }