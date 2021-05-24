export const initialState = null;
// togling logout and login

export const reducer = (state, action) =>
{
    if(action.type === "USER")
    {
        return action.payload;
    }

    return state;
}