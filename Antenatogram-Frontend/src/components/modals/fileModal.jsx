/* eslint-disable react/prop-types */
import { createPortal } from 'react-dom';
import useClickOutside from '../../hooks/useClickOutside';
import file from "../../assets/reports.pdf";


const FileModal = ({ isOpen, onClose, fileUrl }) => {

    const domNode = useClickOutside(onClose);


    const handlePrint = () => {
        const printWindow = window.open(fileUrl);
        printWindow.print();
    };

    const handleSave = () => {
        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = fileUrl.substring(fileUrl.lastIndexOf('/') + 1);
        link.click();
    };

    if (isOpen == -1) return null;

    return createPortal(
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
            <div
                ref={domNode}
                className="bg-white border border-gray-800 rounded-lg shadow-lg p-6 h-5/6 w-3/6"
            >

                <button onClick={onClose} className="absolute top-2 right-2 text-2xl">&times;</button>
                <div className="modal-content w-full h-full">
                    <object data={ file } type='application/pdf' width='100%' height="100%"  />
                    
                    

                </div>

            </div>
        </div>,
        document.getElementById('portal')
    );
};

export default FileModal;
