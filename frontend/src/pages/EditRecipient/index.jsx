import Header from '../../components/Header';
import FabIcon from '../../components/FabIcon';
import Recipient from '../../components/Recipient';

export default function EditRecipient() {
    return (
        <>
            <FabIcon />
            <Header />
            <Recipient title='Editar Recipiente' type='edit' />
        </>
    );
}
