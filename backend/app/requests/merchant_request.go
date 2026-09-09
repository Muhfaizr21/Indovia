package requests

type CreateMerchantRequest struct {
	Name         string `json:"name" binding:"required,min=3,max=150"`
	Subdomain    string `json:"subdomain"`
	CustomDomain string `json:"custom_domain"`
	OwnerName    string `json:"owner_name" binding:"required,min=3"`
	OwnerEmail   string `json:"owner_email" binding:"required,email"`
	OwnerPhone   string `json:"owner_phone" binding:"required"`
	City         string `json:"city"`
	Address      string `json:"address"`
	Category     string `json:"category"`
	Plan         string `json:"plan"`
}

type UpdateMerchantStatusRequest struct {
	Status string `json:"status" binding:"required,oneof=trial active past_due suspended archived"`
	Reason string `json:"reason"`
}

type ReviewKYCRequest struct {
	Decision string `json:"decision"`
	Status   string `json:"status"`
	Notes    string `json:"notes"`
}
