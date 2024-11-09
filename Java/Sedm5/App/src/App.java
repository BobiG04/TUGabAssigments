import java.net.URL;
import java.net.URLConnection;
import java.net.MalformedURLException;
import java.io.IOException;

final static String IDK = "http://www.kst.tugab.bg/";

public static void main(String[] args) throws Exception {
    try {
        URL link = new URL(IDK);
        URLConnection conn = link.openConnection();
        String serverInfo = conn.getHeaderField("Server");
        if (serverInfo != null) {
            System.out.println(serverInfo);
        } else {
            if (conn.getContentLength() == -1) {
                System.out.println("Липсва мрежова свързаност, " +
                                   "протоколът не се поддържа или има такъв хост!");
            } else {
                System.out.println("Не е зададено име на Web сървъра!");
            }
        }
    } catch (MalformedURLException ex) {
        System.out.println("Невалиден синтаксис на заявката!");
    } catch (IOException ex) {
        System.out.println("Грешка при комуникация със сървъра!");
    }
}
