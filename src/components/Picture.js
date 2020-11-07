import React from 'react';

const Picture = ({ picture , setModalWindowPicture } ) => {
	const { alt_description: desc } = picture;

	const hoverPicture = (e) => {
		console.log(picture);

		const overlay = e.currentTarget.classList;
		
		if (overlay.contains('open' )) {
			overlay.remove('open');
		} else {
			overlay.add('open');
		}
  };
  
  const openModalWindow =() => {
    setModalWindowPicture(picture)
    
  }
	return (
		<figure onMouseEnter={hoverPicture} onMouseLeave={hoverPicture}>
			<img src={`${picture.urls.small}`} alt={`${desc}`} />
			<div className='photo-overlay'>
				<h3>{desc}</h3>
        <i className="fas fa-plus" onClick={openModalWindow}></i>
				<i className='far fa-heart' area-hidden="true"></i>
			</div>
		</figure>
	);
};

export default Picture;
