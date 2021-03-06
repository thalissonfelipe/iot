import Header from '../../components/Header';
import FabIcon from '../../components/FabIcon';
import Recipient from '../../components/Recipient';

export default function CreateRecipient() {
    return (
        <>
            <FabIcon />
            <Header previous='/dashboard' next='/'/>
            <Recipient title='Cadastrar Recipiente' type='create' />
        </>
    );
}
