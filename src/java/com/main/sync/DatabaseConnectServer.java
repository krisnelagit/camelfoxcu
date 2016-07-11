
package com.main.sync;

import com.mysql.jdbc.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;

/**
 *
 * @author krisnela
 */
public class DatabaseConnectServer {

    Connection conn = null;


    public DatabaseConnectServer() {
        try {
            Class.forName("com.mysql.jdbc.Driver");
            conn = (Connection) DriverManager.getConnection("jdbc:mysql://192.168.1.114:3306/karworx", "root", "krisnela");
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    public Connection getConnection() {
        return conn;
    }

}
