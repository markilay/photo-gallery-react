import React from 'react';

const ModalWindow = ({ modalWindowPicture }) => {
	if (!modalWindowPicture) {
		return null;
	}
	const {
		urls: { full: url },
		alt_description: desc,
	} = modalWindowPicture;
	return (
		<div className={!modalWindowPicture ? 'modal-outer' : 'modal-outer open'}>
			<div className='modal-inner'>
				<figure>
					<img src={`${url}`} alt={`${desc}`} />
				</figure>
			</div>
		</div>
	);
};

export default ModalWindow;
