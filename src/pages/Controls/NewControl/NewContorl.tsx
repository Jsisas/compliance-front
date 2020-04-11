import React, { useState, FormEvent, ChangeEvent } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../redux/reducer';
import { Control, createControl, selectAllControls } from '../../../redux/Control/ControlSlice';
import produce from 'immer';

export function NewControl() {
    const controls = useSelector((state: RootState) => selectAllControls(state));
    const dispatch = useDispatch();
    const [newControl, setNewContorl] = useState<Control>({
        id: -1,
        title: ""
    });

    const handleCreateNewContorl = (e: FormEvent<HTMLButtonElement>): void => {
        e.preventDefault();

        if (!newControl.title.length) return;

        const controlWithId = produce(newControl, (draft: Control) => {
            let id = Math.max(...controls.map((o: Control) => o.id), 0);
            if (id < 1) {
                id = 1;
            }
            draft.id = id;
        })

        setNewContorl(controlWithId);
        dispatch(createControl(newControl));
    };

    const handleControlTitleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setNewContorl(produce(newControl, (draft: Control) => {
            draft.title = e.target.value;
        }));
    }

    return (
        <>
            <h1>Add Control</h1>
            <form>
                <input type="text" onChange={handleControlTitleChange} value={newControl.title} />
                <button onClick={handleCreateNewContorl}>Add Course</button>
            </form>
        </>
    )
}