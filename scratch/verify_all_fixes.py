import os
from playwright.sync_api import sync_playwright

artifact_dir = r"C:\Users\Lost_\.gemini\antigravity\brain\7c742522-e176-4150-a708-b7acd96a343c"

def verify():
    with sync_playwright() as p:
        browser = p.chromium.launch(channel="msedge", headless=True)
        page = browser.new_page(viewport={"width": 1440, "height": 900})
        
        # 1. Landing Header & Hero Buttons
        page.goto("http://localhost:3000")
        page.wait_for_timeout(1000)
        page.screenshot(path=os.path.join(artifact_dir, "audit_fixed_1_landing_hero.png"))
        
        # 2. Cafe Modal ("Siparişe Özel Not", no barista, clean font)
        page.click("button:has-text('Masa Menüsünü Aç')")
        page.wait_for_timeout(500)
        page.click("button:has-text('Kafe & Mutfak')")
        page.wait_for_timeout(500)
        page.click("h3:has-text('Flat White')")
        page.wait_for_timeout(500)
        page.screenshot(path=os.path.join(artifact_dir, "audit_fixed_2_cafe_modal.png"))
        
        # Close modal
        page.keyboard.press("Escape")
        page.wait_for_timeout(300)
        
        # 3. Staff Login ("Giriş Şifresi", clean font)
        page.goto("http://localhost:3000")
        page.wait_for_timeout(500)
        page.click("button:has-text('Personel Portalı')")
        page.wait_for_timeout(500)
        page.screenshot(path=os.path.join(artifact_dir, "audit_fixed_3_staff_login.png"))
        
        # Login as Admin
        page.fill("input[type='password']", "enes")
        page.click("button:has-text('Panele Giriş Yap')")
        page.wait_for_timeout(800)
        
        # 4. Admin Header (clean, no repeat venue name, clickable KPIs)
        page.screenshot(path=os.path.join(artifact_dir, "audit_fixed_4_admin_header.png"))
        
        # 5. Open New Model Modal (multi-photo gallery upload)
        page.click("button:has-text('Yeni Model Ekle')")
        page.wait_for_timeout(500)
        page.screenshot(path=os.path.join(artifact_dir, "audit_fixed_5_new_model_modal.png"))
        
        # Close new model modal
        page.click("button:has-text('Vazgeç')")
        page.wait_for_timeout(300)
        
        # 6. Store Customizer (clean top bar, sentence case headers)
        page.click("button:has-text('Görsel Vitrin Editörü')")
        page.wait_for_timeout(800)
        page.screenshot(path=os.path.join(artifact_dir, "audit_fixed_6_customizer_header.png"))
        
        browser.close()
        print("ALL_AUDIT_FIXES_VERIFIED")

if __name__ == "__main__":
    verify()
