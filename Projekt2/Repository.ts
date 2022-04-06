import fs from 'fs';

class Repository
{
    public async readStorage() : Promise<string>
    {
        try {
            return await fs.promises.readFile('storageFile.txt', 'utf8');
        }
        catch (err)
        {
            return err.message;
        }
    }

    public async updateStorage(dataToSave: string) : Promise<void>
    {
        try 
        {
            await fs.promises.writeFile('storageFile.txt', dataToSave);
        }
        catch (err)
        {
            return;
        }
    }
}

export default Repository;