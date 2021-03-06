import { injectable } from "tsyringe";
import { DeepPartial, getConnection, Like } from "typeorm";
import { GenreEntity } from "../entity/GenreEntity";
import { Genre } from "../types/genre";
import { AuthorEntity } from "../entity/AuthorEntity";

@injectable()
export class GenreRepository implements Genre.Repository {
  async create(genreData: DeepPartial<GenreEntity>): Promise<GenreEntity> {
    return await getConnection().getRepository(GenreEntity).save(genreData);
  }

  async delete(genre: GenreEntity): Promise<void> {
    await getConnection().getRepository(GenreEntity).delete(genre);
  }

  async getAll(): Promise<GenreEntity[]> {
    return await getConnection().getRepository(GenreEntity).find();
  }

  async getById(genreId: string | number): Promise<GenreEntity | undefined> {
    return await getConnection().getRepository(GenreEntity).findOne(genreId);
  }

  async hasExist(name: string): Promise<boolean> {
    return !!(await getConnection().getRepository(GenreEntity).count({
      where: { name },
    }));
  }

  async search(name: string): Promise<GenreEntity[]> {
    const searchString = `%${name.replace(/\s+/gi, "%")}%`;

    return await getConnection()
      .getRepository(GenreEntity)
      .find({ name: Like<string>(searchString) });
  }

  async update(genreId: number | string, genreData: DeepPartial<GenreEntity>): Promise<GenreEntity> {
    await getConnection().getRepository(GenreEntity).update(genreId, genreData);

    return await getConnection().getRepository(GenreEntity).findOne(genreId);
  }
}
