

import { listContacts, getContactById, removeContact, addContact } from './contacts.js';
import { Command } from 'commander';

const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      const contacts = await listContacts();
      console.log(contacts);
      break;

    case 'get':
      const contact = await getContactById(id);
      console.log(contact);
      break;

    case 'add':
      const newContact = await addContact({ name, email, phone });
      console.log(newContact);
      break;

    case 'remove':
      const removedContact = await removeContact(id);
      console.log(removedContact);
      break;

    default:
      console.warn('Unknown action type!');
  }
}

invokeAction(argv);