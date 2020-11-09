import { createSchema, Type, ExtractDoc, ExtractProps } from 'ts-mongoose';

export const BookSchema = createSchema({
  title: Type.string({ required: true }),
  description: Type.string({ required: true })
}, {
  timestamps: true
});

// export const Book = typedModel('Book', BookSchema);
export type BookDoc = ExtractDoc<typeof BookSchema>
export type BookProps = ExtractProps<typeof BookSchema>
