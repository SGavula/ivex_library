import { getByPlaceholderText, render, screen, fireEvent, cleanup } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import Registration from "../Registration.comp";
import { MemoryRouter } from 'react-router-dom';
import { BrowserRouter } from "react-router-dom";

window.HTMLElement.prototype.scrollIntoView = function() {};
window.scrollTo = jest.fn();

const MockRegistration = () => {
    return (
        <BrowserRouter>
            <Registration />
        </BrowserRouter>
    )
}

describe("Verifying if elements exist on the page", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test("Verify if elements of forms exist on the page", () => {
        /*render(<Registration />, {wrapper: MemoryRouter});*/
        render(<MockRegistration />);
        
        //First Name
        const firstname = screen.getByTestId("firstname");
        //Last Name
        const lastname = screen.getByTestId("lastname");
        //Email
        const email = screen.getByTestId("email");
        //Password
        const password = screen.getByTestId("password");
        //Verification of Password
        const verification_password = screen.getByTestId("verification_password");
        
        expect(firstname.value).toBe("");
        expect(firstname).toBeInTheDocument();
        expect(lastname.value).toBe("");
        expect(lastname).toBeInTheDocument();
        expect(email.value).toBe("");
        expect(email).toBeInTheDocument();
        expect(password.value).toBe("");
        expect(password).toBeInTheDocument();
        expect(verification_password.value).toBe("");
        expect(verification_password).toBeInTheDocument();
    })

    test("Verify if conditions and submit button exists on the page", () => {
        render(<MockRegistration />);
        //Conditions - text
        const condition_text = screen.getByText(/Stlačením tlačídla "Registrovať sa" súhlasíte so/i);
        //Vop
        const vopLink = screen.getByText(/všeobecnými obchodnými podmienkami/i);
        //GDPR
        const gdprLink = screen.getByText(/GDPR/i);
        //Submit Button
        const submit_button = screen.getByRole("button", { name: /Registrovať sa/i });

        expect(condition_text).toBeInTheDocument();
        expect(vopLink).toBeInTheDocument();
        expect(gdprLink).toBeInTheDocument();
        expect(submit_button).toBeInTheDocument();

    })

    test("Verify if price cards have correct values of title and price", () => {
        render(<MockRegistration />);

        //Mothly Card
        const monthly_card = screen.getByRole("heading", { level: 5, name: /Mesačné/i });
        const monthly_price = screen.getByRole("heading", { level: 6, name: /3/i });

        //Semester Card
        const semester_card = screen.getByRole("heading", { level: 5, name: /Semestrálne/i });
        const semester_price = screen.getByRole("heading", { level: 6, name: /8/i });

        //Freemium Card
        const freemium_card = screen.getByRole("heading", { level: 5, name: /Freemium/i });
        const freemium_price = screen.getByRole("heading", { level: 6, name: /0/i });

        expect(monthly_card).toBeInTheDocument();
        expect(monthly_price).toBeInTheDocument();
        expect(semester_card).toBeInTheDocument();
        expect(semester_price).toBeInTheDocument();
        expect(freemium_card).toBeInTheDocument();
        expect(freemium_price).toBeInTheDocument();

    })
});

describe("Verify if we can interact with the elements", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("Verify if form's errors show and border color of inputs changes to red, because of empty form", () => {
        render(<MockRegistration />);
        //First Name
        const firstname = screen.getByTestId("firstname");
        //Last Name
        const lastname = screen.getByTestId("lastname");
        //Email
        const email = screen.getByTestId("email");
        //Password
        const password = screen.getByTestId("password");
        //Verification of Password
        const verification_password = screen.getByTestId("verification_password");

        //Submit Button
        const submit_button = screen.getByRole("button", { name: /Registrovať sa/i });

        fireEvent.click(submit_button);

        const error_firstname = screen.getByText("Zadajte krstné meno");
        const error_lastname = screen.getByText("Zadajte priezvisko");
        const error_email = screen.getByText("Zadajte email");
        const error_password = screen.getByText("Zadajte heslo");

        expect(error_firstname).toBeInTheDocument();
        expect(error_lastname).toBeInTheDocument();
        expect(error_email).toBeInTheDocument();
        expect(error_password).toBeInTheDocument();
        expect(firstname).toHaveClass("input-error");
        expect(lastname).toHaveClass("input-error");
        expect(email).toHaveClass("input-error");
        expect(password).toHaveClass("input-error");
        expect(verification_password).toHaveClass("input-error");
    })

    test("Verify if error message shows and border color of email input changes to red, after writing email withou @", () => {
        render(<MockRegistration />);
        //First Name
        const firstname = screen.getByTestId("firstname");
        //Last Name
        const lastname = screen.getByTestId("lastname");
        //Email
        const email = screen.getByTestId("email");
        //Submit Button
        const submit_button = screen.getByRole("button", { name: /Registrovať sa/i });

        fireEvent.change(firstname, { target: {value: "Testovacie Meno"} });
        fireEvent.change(lastname, { target: {value: "Testovacie Priezvisko"} });
        fireEvent.change(email, { target: {value: "testgmail.com"} });
        fireEvent.click(submit_button);

        const error_email = screen.getByText("Email musí byť vo formáte váš@email.koncovka");

        expect(error_email).toBeInTheDocument();
        expect(email).toHaveClass("input-error");
    })

    test("Verify if error message shows and border color of email input changes to red, after writing email withou dot", () => {
        render(<MockRegistration />);
        //First Name
        const firstname = screen.getByTestId("firstname");
        //Last Name
        const lastname = screen.getByTestId("lastname");
        //Email
        const email = screen.getByTestId("email");
        //Submit Button
        const submit_button = screen.getByRole("button", { name: /Registrovať sa/i });

        fireEvent.change(firstname, { target: {value: "Testovacie Meno"} });
        fireEvent.change(lastname, { target: {value: "Testovacie Priezvisko"} });
        fireEvent.change(email, { target: {value: "test@gmailcom"} });
        fireEvent.click(submit_button);

        const error_email = screen.getByText("Email musí byť vo formáte váš@email.koncovka");

        expect(error_email).toBeInTheDocument();
        expect(email).toHaveClass("input-error");
    })

    test("Verify if error message shows and border color of password input changes to red, after writing password with length less than 6 signs", () => {
        render(<MockRegistration />);
        //First Name
        const firstname = screen.getByTestId("firstname");
        //Last Name
        const lastname = screen.getByTestId("lastname");
        //Email
        const email = screen.getByTestId("email");
        //Password
        const password = screen.getByTestId("password");
        //Submit Button
        const submit_button = screen.getByRole("button", { name: /Registrovať sa/i });

        fireEvent.change(firstname, { target: {value: "Testovacie Meno"} });
        fireEvent.change(lastname, { target: {value: "Testovacie Priezvisko"} });
        fireEvent.change(email, { target: {value: "test@gmail.com"} });
        fireEvent.change(password, { target: {value: "pass"} });
        fireEvent.click(submit_button);

        const error_password = screen.getByText("Heslo musí mať aspoň 6 znakov");

        expect(error_password).toBeInTheDocument();
        expect(password).toHaveClass("input-error");
    })

    test("Verify if error message shows and border color of password input changes to red, after writing password with length more than 6 signs without a number", () => {
        render(<MockRegistration />);
        //First Name
        const firstname = screen.getByTestId("firstname");
        //Last Name
        const lastname = screen.getByTestId("lastname");
        //Email
        const email = screen.getByTestId("email");
        //Password
        const password = screen.getByTestId("password");
        //Submit Button
        const submit_button = screen.getByRole("button", { name: /Registrovať sa/i });

        fireEvent.change(firstname, { target: {value: "Testovacie Meno"} });
        fireEvent.change(lastname, { target: {value: "Testovacie Priezvisko"} });
        fireEvent.change(email, { target: {value: "test@gmail.com"} });
        fireEvent.change(password, { target: {value: "password"} });
        fireEvent.click(submit_button);

        const error_password = screen.getByText("Heslo musí obsahovať aspoň jedno číslo");

        expect(error_password).toBeInTheDocument();
        expect(password).toHaveClass('input-error');
    })

    test("Verify if error message shows and border color of input verification input changes to red, after writing different passwords", () => {
        render(<MockRegistration />);
        //First Name
        const firstname = screen.getByTestId("firstname");
        //Last Name
        const lastname = screen.getByTestId("lastname");
        //Email
        const email = screen.getByTestId("email");
        //Password
        const password = screen.getByTestId("password");
        //Verification of Password
        const verification_password = screen.getByTestId("verification_password");
        //Submit Button
        const submit_button = screen.getByRole("button", { name: /Registrovať sa/i });

        fireEvent.change(firstname, { target: {value: "Testovacie Meno"} });
        fireEvent.change(lastname, { target: {value: "Testovacie Priezvisko"} });
        fireEvent.change(email, { target: {value: "test@gmail.com"} });
        fireEvent.change(password, { target: {value: "password1"} });
        fireEvent.change(verification_password, { target: {value: "password"} });
        fireEvent.click(submit_button);

        const error_password_verification = screen.getByText("Zadané heslá sa nezhodujú");

        expect(error_password_verification).toBeInTheDocument();
        expect(password).toHaveClass('input-error');
        expect(verification_password).toHaveClass('input-error');
    })

    test("Verify if error message shows, after not choosing subscription", () => {
        render(<MockRegistration />);
        //First Name
        const firstname = screen.getByTestId("firstname");
        //Last Name
        const lastname = screen.getByTestId("lastname");
        //Email
        const email = screen.getByTestId("email");
        //Password
        const password = screen.getByTestId("password");
        //Verification of Password
        const verification_password = screen.getByTestId("verification_password");
        //Submit Button
        const submit_button = screen.getByRole("button", { name: /Registrovať sa/i });

        fireEvent.change(firstname, { target: {value: "Testovacie Meno"} });
        fireEvent.change(lastname, { target: {value: "Testovacie Priezvisko"} });
        fireEvent.change(email, { target: {value: "test@gmail.com"} });
        fireEvent.change(password, { target: {value: "password1"} });
        fireEvent.change(verification_password, { target: {value: "password1"} });
        fireEvent.click(submit_button);

        const subscription_error = screen.getByText("Vyberte typ predplatného prosím");

        expect(subscription_error).toBeInTheDocument();
    });

    test("Verify if error message shows, after typing registered email", async () => {
        render(<MockRegistration />);
        //First Name
        const firstname = screen.getByTestId("firstname");
        //Last Name
        const lastname = screen.getByTestId("lastname");
        //Email
        const email = screen.getByTestId("email");
        //Password
        const password = screen.getByTestId("password");
        //Verification of Password
        const verification_password = screen.getByTestId("verification_password");
        //Price Button
        const priceButtons = screen.getAllByText("Vybrať");
        //Submit Button
        const submit_button = screen.getByRole("button", { name: /Registrovať sa/i });

        fireEvent.change(firstname, { target: {value: "Testovacie Meno"} });
        fireEvent.change(lastname, { target: {value: "Testovacie Priezvisko"} });
        fireEvent.change(email, { target: {value: "Alaina_Droppov63@gmail.com"} });
        fireEvent.change(password, { target: {value: "password1"} });
        fireEvent.change(verification_password, { target: {value: "password1"} });
        fireEvent.click(priceButtons[0]);
        fireEvent.click(submit_button);

        const email_error = await screen.findByText("Tento email sa už používa, zvoľte prosím nový email");

        expect(email_error).toBeInTheDocument();
    });

    test("Verify color change after clicking on Vybrať button in monthly subscription", () => {
        render(<MockRegistration />);

        //Price Button
        const priceButtons = screen.getAllByText("Vybrať");

        fireEvent.click(priceButtons[0]);

        expect(priceButtons[0]).toHaveClass("button grey medium");
    });

    test("Verify color change after clicking on Vybrať button in semester subscription", () => {
        render(<MockRegistration />);

        //Price Button
        const priceButtons = screen.getAllByText("Vybrať");

        fireEvent.click(priceButtons[1]);

        expect(priceButtons[1]).toHaveClass("button grey medium");
    })

    test("Verify color change after clicking on Vybrať button in semester subscription", () => {
        render(<MockRegistration />);

        //Price Button
        const priceButtons = screen.getAllByText("Vybrať");

        fireEvent.click(priceButtons[2]);

        expect(priceButtons[2]).toHaveClass("button grey medium");
    })
})

describe("Verify redirection of VOP and GDPR links", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("Verify href attribute in VOP and GDPR link", () => {
        render(<MockRegistration />);

        //Vop
        const vopLink = screen.getByText(/všeobecnými obchodnými podmienkami/i);
        //GDPR
        const gdpr = screen.getByText(/GDPR/i);

        expect(vopLink).toHaveAttribute('href', '/vop');
        expect(gdpr).toHaveAttribute('href', '/gdpr');

    })
})