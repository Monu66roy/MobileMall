from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """All configuration comes from environment variables. No secrets live in code."""

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    environment: str = "development"  # development | staging | production
    database_url: str = "postgresql+psycopg://mobilemall:change-me@localhost:5432/mobilemall"
    cors_origins: str = "http://localhost:3000"
    secret_key: str = "change-me"  # must be overridden outside development
    # Revalidation hook so admin edits show on the public site without a deploy
    frontend_revalidate_url: str = ""
    frontend_revalidate_token: str = ""
    # Integrations (backend only; never exposed to the browser)
    gemini_api_key: str = ""
    smtp_host: str = ""
    smtp_port: int = 587
    smtp_user: str = ""
    smtp_password: str = ""
    store_notify_email: str = ""

    @property
    def cors_list(self) -> list[str]:
        return [o.strip() for o in self.cors_origins.split(",") if o.strip()]

    @property
    def is_production(self) -> bool:
        return self.environment == "production"


@lru_cache
def get_settings() -> Settings:
    s = Settings()
    if s.is_production and s.secret_key == "change-me":
        raise RuntimeError("SECRET_KEY must be set in production")
    return s
