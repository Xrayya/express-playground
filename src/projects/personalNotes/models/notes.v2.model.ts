import { nanoid } from "nanoid";
import { INoteModel, Note } from "./notes";
import mysql from "mysql2/promise";
import { RowDataPacket } from "mysql2/promise";

const query = async <T>(sql: string, values?: any) => {
  const db = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "rahasia",
    database: "personal_notes",
  });

  const [rows] = await db.execute<T & RowDataPacket[]>(sql, values);

  return rows;
};

class NoteModelV2 implements INoteModel {
  getAllNotes: INoteModel["getAllNotes"] = async (archived) => {
    try {
      const rows = query<Omit<Note, "archived">[]>(
        "select id, title, body, created_at, updated_at from note where archived = ?",
        [archived],
      );

      return rows;
    } catch (error) {
      throw new Error(`Internal server error: ${error}`);
    }
  };

  getNotesById: INoteModel["getNotesById"] = async (id) => {
    let note;
    try {
      const rows = await query<Note[]>("select * from note where id = ?", [id]);

      if (rows.length > 0) {
        note = rows[0];
      }
    } catch (error) {
      throw new Error(`Internal server error: ${error}`);
    }

    if (!note) {
      throw new Error("The specified note not found");
    }

    return note;
  };

  // TODO: use pattern matching in mysql
  getNotesByContent: INoteModel["getNotesByContent"] = async (
    archived,
    content,
  ) => {
    return [];
  };

  addNote: INoteModel["addNote"] = async (note) => {
    const id = nanoid(16);
    const { title, body, archived } = note;

    try {
      await query(
        "insert into note values (?, ?, ?, ?, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP())",
        [id, title, body, archived],
      );
      return id;
    } catch (error) {
      throw new Error(`Internal server error: ${error}`);
    }
  };

  deleteNoteById: INoteModel["deleteNoteById"] = async (id) => {
    let found: boolean = false;
    try {
      if (await this.getNotesById(id)) {
        await query("delete from note where id = ?", [id]);
        found = true;
      }
    } catch (error) {
      throw new Error(`Internal server error: ${error}`);
    }

    if (!found) {
      throw new Error("The specified note not found");
    }

    return id;
  };

  changeNoteById: INoteModel["changeNoteById"] = async (id, data) => {
    const { title, body, archived } = data;

    let found: boolean = false;
    try {
      if (await this.getNotesById(id)) {
        await query(
          "update note set title = ?, body = ?, archived = ?, updated_at = CURRENT_TIMESTAMP()",
          [title, body, archived],
        );
        found = true;
      }
    } catch (error) {
      throw new Error(`Internal server error: ${error}`);
    }

    if (!found) {
      throw new Error("The specified note not found");
    }

    return id;
  };
}

export default NoteModelV2;
