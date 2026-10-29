from pydantic import BaseModel, EmailStr, Field, field_validator


class ContactIn(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    phone: str = Field(default="", max_length=20)
    subject: str = Field(min_length=3, max_length=160)
    message: str = Field(min_length=10, max_length=4000)
    consent: bool
    website: str = ""  # honeypot: real users never fill this

    @field_validator("consent")
    @classmethod
    def must_consent(cls, v: bool) -> bool:
        if not v:
            raise ValueError("Consent is required to submit the form")
        return v


class ContactOut(BaseModel):
    reference: str
