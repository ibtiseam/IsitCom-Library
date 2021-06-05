import React from 'react'

function Home() {
    return (
       <div className="header">

		<div className="st-header st-fullHeight">
			<div className="header-overlay"></div>
				<div className="container">
					<div className="row">
						<div className="col-md-12 text-center st-header-content">
						<div className="st-header-title">
								<h2>Welcome To<span> ISITCOM ONLINE LIBRARY</span></h2>
									<p> Here, We Share Experience .</p>
							</div>
						</div>
					</div>
				</div>
		</div>
	
		<section className="contact">
		<div className="container">
			<div className="row">
				<div className="col-sm-6 contact-info">
					<h2 className="contact-title text-uppercase">Contact us</h2>
					<p className="st-address"><i className="fa fa-map-marker"></i> <strong>Main road N°1 4011, H. SOUSSE SOUSSE Tunisia - 4011 Sousse</strong></p>
					<p className="st-phone"><i className="fa fa-mobile"></i> <strong>+216 73 37 15 71</strong></p>
					<p className="st-email"><i className="fa fa-envelope-o"></i> <strong>isitcom.libray@gmail.com</strong></p>
					<p className="st-website"><i className="fa fa-globe"></i> <strong>http://www.isitcom.rnu.tn</strong></p>
				</div>
				<div className="col-sm-6 contact-form">
					<form id="" name="contact-form" method="post" action="" >
						<input type="text" name="name" required="required" id="contact-name" placeholder="Your Name"/>
						<input type="email" name="email" required="required" id="contact-email" placeholder="Your Email"/>
						<textarea placeholder="Massage" name="message" required="required" id="contact-message" cols="70" rows="6"></textarea>
						<input type="submit" value="Send message" name="contact-submit"/>
					</form>
				</div>
			</div>
		</div>
	</section>

	<footer className="footer">
		<div className="container">
			<div className="row">
				<div className="col-sm-6 col-sm-push-6 social-icons">
					<a href="https://www.facebook.com/groups/296079240922453/"><i className="fa fa-facebook"></i></a>
				</div>
				
				<div className="col-sm-6 col-sm-pull-6 copyright">
					<p>&copy; 2021. All Rights Reserved.</p>
				</div>
			</div>
		</div>
	</footer>
    </div>  
    )
}

export default Home
