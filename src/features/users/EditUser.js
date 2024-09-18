import { useParams } from 'react-router-dom'
import EditUserForm from './EditUserForm'
import PulseLoader from 'react-spinners/PulseLoader'
import { useGetUsersQuery } from './usersApiSlice'

const EditUser = () => {
    const { id } = useParams()
    const {user} = useGetUsersQuery('usersList', {
        selectFromResult: ({data}) => ({
            user: data?.entities[id]
        })
    })
   
    if(!user){
        return <PulseLoader color={'#FFF'}></PulseLoader>
    }

    const content = <EditUserForm user={user} /> 

    return content
}
export default EditUser