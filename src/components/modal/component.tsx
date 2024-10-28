import Button from "../button/component";
import { useModal } from "./context";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"



export default function Modal() {
    const { modalShow, modalTitle, modalBody, hideModal } = useModal();

    return (
        <Dialog open={modalShow}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{modalTitle}</DialogTitle>
                    <Button ButtonName="Fechar"  type="button" variant="secondary" onClick={hideModal} />
                </DialogHeader>
                {modalBody}
            </DialogContent>
        </Dialog>
    )
}