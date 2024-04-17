import getConfig from 'next/config';
import mongoose from 'mongoose';

const { serverRuntimeConfig } = getConfig();
const Schema = mongoose.Schema;

mongoose.connect(process.env.MONGODB_URI || serverRuntimeConfig.connectionString);
mongoose.Promise = global.Promise;

export const db = {
    User: userModel(),
    Appointment: appointmentModel(),
    Vacation: vacationModel()
};

function userModel() {
    const schema = new Schema({
        username: { type: String, unique: true, required: true },
        hash: { type: String, required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, unique: true, required: true }, // Nuevo campo: Email
        role: { type: String, enum: ['user', 'admin'], default: 'user' }, // Nuevo campo: Rol
        registrationDate: { type: Date, default: Date.now } // Nuevo campo: Fecha de Registro
    }, {
        timestamps: true
    });

    schema.set('toJSON', {
        virtuals: true,
        versionKey: false,
        transform: function (doc, ret) {
            delete ret._id;
            delete ret.hash;
        }
    });

    return mongoose.models.User || mongoose.model('User', schema);
}

function appointmentModel() {
    const schema = new Schema({
        dateTime: { type: Date, required: true },
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        description: { type: String, required: true },
        status: { type: String, enum: ['pending', 'completed', 'cancelled'], default: 'pending' }
    }, {
        timestamps: true
    });

    return mongoose.models.Appointment || mongoose.model('Appointment', schema);
}

function vacationModel() {
    const schema = new Schema({
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Referencia al usuario
        startDate: { type: Date, required: true }, // Fecha de inicio de las vacaciones
        endDate: { type: Date, required: true }, // Fecha de fin de las vacaciones
        status: { type: String, enum: ['approved', 'pending', 'rejected'], default: 'pending' }, // Estado de las vacaciones
        comments: { type: String } // Comentarios opcionales
    }, {
        timestamps: true
    });

    return mongoose.models.Vacation || mongoose.model('Vacation', schema);
}