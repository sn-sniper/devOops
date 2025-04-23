import { 
  users, type User, type InsertUser,
  contactEntries, type ContactEntry, type InsertContact
} from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createContactEntry(contact: InsertContact): Promise<ContactEntry>;
  getContactEntries(): Promise<ContactEntry[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private contacts: Map<number, ContactEntry>;
  userCurrentId: number;
  contactCurrentId: number;

  constructor() {
    this.users = new Map();
    this.contacts = new Map();
    this.userCurrentId = 1;
    this.contactCurrentId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  async createContactEntry(contactData: InsertContact): Promise<ContactEntry> {
    const id = this.contactCurrentId++;
    const createdAt = new Date();
    const contact: ContactEntry = { ...contactData, id, createdAt };
    this.contacts.set(id, contact);
    return contact;
  }
  
  async getContactEntries(): Promise<ContactEntry[]> {
    return Array.from(this.contacts.values());
  }
}

export const storage = new MemStorage();
