'use client'
import Button from "../button/component";
import { useModal } from "./context";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"




export default function Modal() {

    const { modalShow, modalTitle, modalBody, hideModal } = useModal();

    return (
        <Dialog open={modalShow} onOpenChange={hideModal}>
            <DialogContent className="bg-#1b1b1b text-white border-none">
                <DialogHeader>
                    <DialogTitle>{modalTitle}</DialogTitle>
                </DialogHeader>
                <div className="modal-body">{modalBody}</div>
                <DialogFooter>
                    <Button ButtonName="Fechar" type="button" variant="secondary" onClick={hideModal} />
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}