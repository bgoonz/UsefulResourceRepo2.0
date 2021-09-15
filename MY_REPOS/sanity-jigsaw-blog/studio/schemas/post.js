export default {
    name: 'post',
    title: 'Post',
    type: 'document',
    initialValue: {
        featured: false,
        extends: '_layouts.post',
        section: 'content'
    },

    fields: [
        {
            name: 'extends',
            title: 'Extends',
            type: 'string',
            hidden: true
        }
        ,
        {
            name: 'title',
            title: 'Title',
            type: 'string'
        }
        ,
        {
            name: 'featured',
            title: 'Featured',
            type: 'boolean',
            options: {
                layout: 'switch'
            }
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96
            }
        },
        {
            name: 'cover_image',
            title: 'Cover image',
            type: 'image',
            options: {
                hotspot: true
            }
        },
        {
            name: 'section',
            title: 'Section',
            type: 'string',
        },
        {
            name: 'categories',
            title: 'Categories',
            type: 'array',
            of: [{type: 'reference', to: {type: 'category'}}]
        },
        {
            name: 'date',
            title: 'Date',
            type: 'date',
            options: {
                dateFormat: 'YYYY-MM-DD',
                calendarTodayLabel: 'Today'
            }
        },
        {
            name: 'body',
            title: 'Body',
            type: 'blockContent'
        },
        {
            name: 'author',
            title: 'Author',
            type: 'reference',
            to: {type: 'author'}
        }
    ],
    preview: {
        select: {
            title: 'title',
            author: 'author.name',
            media: 'mainImage'
        },
        prepare(selection) {
            const {author} = selection
            return Object.assign({}, selection, {
                subtitle: author && `by ${author}`
            })
        }
    }
}
