import React, { Component } from 'react';
import ListContacts from './ListContacts';
import * as ContactsAPI from './utils/ContactsAPI';
import CreateContact from './CreateContact';
import { Route } from 'react-router-dom';
class App extends Component {
    state = {
        contacts: [],
    };
    componentDidMount() {
        ContactsAPI.getAll().then((contacts) => this.setState({ contacts: contacts }));
    }
    removeContact = (contact) => {
        this.setState((currentState) => ({
            contacts: currentState.contacts.filter((c) => contact.id !== c.id),
        }));
        ContactsAPI.remove(contact);
    };
    CreateContact = (contact) => {
        ContactsAPI.create(contact).then((contact) =>
            this.setState((currentState) => ({
                contacts: currentState.contacts.concat([ contact ]),
            })),
        );
    };
    render() {
        const { contacts } = this.state;
        return (
            <div>
                <Route
                    exact
                    path="/"
                    component={() => <ListContacts contacts={contacts} removeContact={this.removeContact} />}
                />
                <Route
                    path="/create"
                    component={({ history }) => (
                        <CreateContact
                            onCreateContact={(contact) => {
                                this.CreateContact(contact);
                                history.push('/');
                            }}
                        />
                    )}
                />
            </div>
        );
    }
}

export default App;
