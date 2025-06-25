import mongoose from 'mongoose';

class Database {
    async connect(connectionString) {
        try {
            mongoose.set('debug', true); 
            mongoose.set('debug',{color:true}); 

            await mongoose.connect(connectionString);

            console.log('MongoDB connected successfully!');
        } catch (error) {
            console.error('MongoDB connection error:', error);
            throw error;
        }
    }

    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }
}

export default Database.getInstance();
