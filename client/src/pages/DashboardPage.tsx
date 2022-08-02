import Button from '@mui/material/Button'
import { logout } from "../redux/slices/authSlice"
import { useDispatch } from "react-redux"

const DashboardPage = () => {
  const dispatch = useDispatch()
  return (
    <div>
      <h1>Congrats, you are logged in</h1>
      <Button onClick={dispatch(logout)} variant="contained" color="primary">
        Log out
      </Button>
    </div>
  );
}

export default DashboardPage