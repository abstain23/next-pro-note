import {marked} from 'marked'
import sanitizeHtml from 'sanitize-html'


const allowedTags = sanitizeHtml.defaults.allowedTags.concat([
    'img',
    'h1',
    'h2',
    'h3'
])
const allowedAttributes = Object.assign(
    {},
    sanitizeHtml.defaults.allowedAttributes,
    {
        img: ['alt', 'src']
    }
)

type Props = {
    children: string
}

// 这里不能用async 不然会每次重新渲染
export default function NotePreview({ children }: Props) {
    const html= marked(children || '') as string
    console.log(html);
    return (
        <div className="note-preview">
            <div
                className="text-with-markdown"
                dangerouslySetInnerHTML={{
                    __html: sanitizeHtml(html, {
                        allowedTags,
                        allowedAttributes
                    })
                }}
            />
        </div>
    )
}

