import mongoose, { Schema, Document, Model } from 'mongoose';

// Interface do Evento
export interface IEvento extends Document {
    titulo: string;
    descricao?: string;
    data: Date;
    local: string;
}

// Schema do Evento
const EventoSchema: Schema = new Schema<IEvento>({
    titulo: { type: String, required: [true, "o campo 'Titulo' é obrigatório"] },
    descricao: { type: String },
    data: { type: Date, required: [true, "o campo 'Data' é obrigatório"] },
    local: { type: String, required: [true, "o campo 'Local' é obrigatório"] },
}, { timestamps: true });

// Modelo
export const Evento: Model<IEvento> = mongoose.model<IEvento>('Evento', EventoSchema);
