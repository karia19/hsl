import { render, screen, cleanup } from '@testing-library/react';
import { act } from "react-dom/test-utils";
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import StorePanel from '../storePanel';
import { fetchData } from '../../services/stationDataApi';

jest.mock('axios');

test("no error meaage when page loads", async () => {  
    render(<StorePanel />);
    const alertElement = screen.queryByRole("alert");
    expect(alertElement).toBeNull()
});

test("error message when form fields is missing", async  () => {
    render(<StorePanel />);
    const buttonElement = screen.getByRole("button");
    await act(async () => {
        await userEvent.click(buttonElement)
    })
    const alertElement = screen.getByRole("alert");
    expect(alertElement).toBeInTheDocument()

});
test("error message when some of the form fields is missing", async  () => {
    render(<StorePanel />);
    const inputElement = screen.getByTestId("nimi");
    await act(async () => { 
        await userEvent.type(inputElement, "Siilitie M")
    })
    const buttonElement = screen.getByRole("button");           
    await act(async () => {
        await userEvent.click(buttonElement)
    })
    const alertElement = screen.getByRole("alert");
    expect(alertElement).toBeInTheDocument()

});
/*
test("fetches station data from API successfully", async () => {
    axios.get.mockResolvedValueOnce({ data: mockData });

    //const data =  await fetchData('http://localhost:3003/api/v1/stations')
    //console.log(data)
    //expect(data).toBeDefined();
}
   
);
*/